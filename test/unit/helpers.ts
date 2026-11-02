import { vi } from "vitest";
import { Strava } from "../../src";

export const BASE_URL = "https://www.strava.com/api/v3";

export const createClient = (props: Partial<ConstructorParameters<typeof Strava>[0]> = {}) =>
    new Strava({
        accessToken: "ACCESS_TOKEN",
        refreshToken: "REFRESH_TOKEN",
        clientId: "CLIENT_ID",
        clientSecret: "CLIENT_SECRET",
        ...props,
    });

export const jsonResponse = (data: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(data), {
        status: 200,
        ...init,
        headers: { "Content-Type": "application/json", ...init.headers },
    });

/**
 * Replace the global fetch, each call gets the next response (the last one is repeated).
 */
export const mockFetch = (...responses: Response[]) => {
    const queue = responses.length ? responses : [jsonResponse({})];
    let index = 0;
    const fn = vi.fn(async (_url: URL | string, _init?: RequestInit) => {
        const response = queue[Math.min(index++, queue.length - 1)];
        return response.clone();
    });
    vi.stubGlobal("fetch", fn);
    return fn;
};

/** url, method, headers and body of the n-th fetch call (last by default) */
export const fetchCall = (fn: ReturnType<typeof mockFetch>, n = -1) => {
    const [url, init = {}] = fn.mock.calls.at(n)!;
    return {
        url: new URL(url),
        method: init.method,
        headers: (init.headers ?? {}) as Record<string, string>,
        body: init.body,
    };
};
