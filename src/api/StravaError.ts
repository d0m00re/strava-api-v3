import * as entity from "../entity/strava.entity";

export interface IRateLimit {
    shortTermLimit: number; // 15 minutes quota
    shortTermUsage: number;
    dailyLimit: number;
    dailyUsage: number;
}

/**
 * Read the X-RateLimit-Limit / X-RateLimit-Usage headers ("15min,daily").
 * Returns undefined when Strava did not send them.
 */
export const parseRateLimit = (headers: Headers): IRateLimit | undefined => {
    const limit = headers.get("X-RateLimit-Limit");
    const usage = headers.get("X-RateLimit-Usage");
    if (!limit || !usage) return undefined;
    const [shortTermLimit, dailyLimit] = limit.split(",").map(Number);
    const [shortTermUsage, dailyUsage] = usage.split(",").map(Number);
    return { shortTermLimit, shortTermUsage, dailyLimit, dailyUsage };
}

/**
 * Thrown for every non 2xx response returned by the Strava API.
 */
export class StravaError extends Error {
    status: number;
    errors: entity.IError[];
    rateLimit?: IRateLimit;

    constructor(status: number, message: string, errors: entity.IError[] = [], rateLimit?: IRateLimit) {
        super(message);
        this.name = "StravaError";
        this.status = status;
        this.errors = errors;
        this.rateLimit = rateLimit;
    }

    static async fromResponse(response: Response): Promise<StravaError> {
        const fault: Partial<entity.IFault> = await response.json().catch(() => ({}));
        const args = [
            response.status,
            fault.message ?? response.statusText,
            fault.errors ?? [],
            parseRateLimit(response.headers)
        ] as const;

        switch (response.status) {
            case 401: return new StravaAuthError(...args);
            case 404: return new StravaNotFoundError(...args);
            case 429: return new StravaRateLimitError(...args);
            default: return new StravaError(...args);
        }
    }
}

/** 401 : missing, invalid or expired token, or missing scope */
export class StravaAuthError extends StravaError {
    constructor(...args: ConstructorParameters<typeof StravaError>) {
        super(...args);
        this.name = "StravaAuthError";
    }
}

/** 404 : resource not found, or not visible with the current token */
export class StravaNotFoundError extends StravaError {
    constructor(...args: ConstructorParameters<typeof StravaError>) {
        super(...args);
        this.name = "StravaNotFoundError";
    }
}

/** 429 : 15 minutes or daily quota exceeded, see rateLimit */
export class StravaRateLimitError extends StravaError {
    constructor(...args: ConstructorParameters<typeof StravaError>) {
        super(...args);
        this.name = "StravaRateLimitError";
    }
}
