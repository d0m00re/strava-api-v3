import * as subApi from "./subApi";
import { StravaError, IRateLimit, parseRateLimit } from "./StravaError";

// refresh the access token when it expires in less than this
const REFRESH_MARGIN_MS = 5 * 60 * 1000;
const RETRY_BASE_DELAY_MS = 1000;

interface IRequestOptions {
    query?: Record<string, unknown>;
    body?: unknown; // sent as json
    form?: FormData | URLSearchParams;
    text?: boolean; // read the response as text instead of json
    auth?: boolean; // send the Authorization header, default true
}

export interface IRequestLog {
    method: string;
    url: string; // never contains a token or a secret
    status: number;
    durationMs: number;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
    expiresAt: number; // epoch, in seconds
}

interface IStravaApi {
    accessToken: string;
    clientId: string;
    clientSecret: string;
    refreshToken?: string;
    expiresAt?: number; // epoch in seconds, as returned by Strava. Enables the refresh before expiration
    onTokenRefresh?: (tokens: ITokens) => void | Promise<void>; // save the new tokens here
    maxRetries?: number; // retries on 429 and 5xx with exponential backoff, default 0
    logger?: (log: IRequestLog) => void; // called after each request
}

class StravaApi {
    private accessToken: string;
    private refreshToken: string;
    private clientId: string;
    private clientSecret: string;
    private expiresAt?: number;
    private baseUrl: string = "https://www.strava.com/api/v3";
    private logger?: (log: IRequestLog) => void;
    private onTokenRefresh?: (tokens: ITokens) => void | Promise<void>;
    private maxRetries: number;
    private pendingRefresh?: Promise<void>;

    /** Quota state read from the last response, undefined before the first request */
    public rateLimit?: IRateLimit;

    public auth0: subApi.StravaAuth0Api;
    public activity: subApi.StravaActivityApi;
    public athlete: subApi.StravaAthleteApi;
    public club: subApi.StravaClubApi;
    public gear: subApi.StravaGearApi;
    public route: subApi.StravaRoutesApi;
    public segment: subApi.StravaSegmentApi;
    public segmentEffort: subApi.StravaSegmentEffortsApi;
    public upload: subApi.StravaUploadApi;

    constructor(props: IStravaApi) {
        this.accessToken = props.accessToken;
        this.clientId = props.clientId;
        this.clientSecret = props.clientSecret;
        this.refreshToken = props.refreshToken ?? "";
        this.expiresAt = props.expiresAt;
        this.onTokenRefresh = props.onTokenRefresh;
        this.maxRetries = props.maxRetries ?? 0;
        this.logger = props.logger;

        this.auth0 = new subApi.StravaAuth0Api(this);
        this.activity = new subApi.StravaActivityApi(this);
        this.athlete = new subApi.StravaAthleteApi(this);
        this.club = new subApi.StravaClubApi(this);
        this.gear = new subApi.StravaGearApi(this);
        this.route = new subApi.StravaRoutesApi(this);
        this.segment = new subApi.StravaSegmentApi(this);
        this.segmentEffort = new subApi.StravaSegmentEffortsApi(this);
        this.upload = new subApi.StravaUploadApi(this);
    }

    getBaseUrl = () => this.baseUrl;
    setBaseUrl = (baseUrl: string) => (this.baseUrl = baseUrl);

    getClientId = () => this.clientId;
    setClientId = (clientId: string) => (this.clientId = clientId);

    getClientSecret = () => this.clientSecret;
    setClientSecret = (clientSecret: string) => (this.clientSecret = clientSecret);

    getAccessToken = () => this.accessToken;
    setAccessToken = (accessToken: string) => (this.accessToken = accessToken);

    getRefreshToken = () => this.refreshToken;
    setRefreshToken = (refreshToken: string) => (this.refreshToken = refreshToken);

    getExpiresAt = () => this.expiresAt;
    setExpiresAt = (expiresAt: number | undefined) => (this.expiresAt = expiresAt);

    getAuthHeader = () => ({ Authorization: `Bearer ${this.accessToken}` });

    /**
     * Get a new access token with the refresh token, then call onTokenRefresh.
     * Concurrent calls share the same refresh.
     */
    refreshAccessToken(): Promise<void> {
        this.pendingRefresh ??= (async () => {
            const tokens = await this.auth0.retrieveAccessTokenWtRefreshToken(this.refreshToken);
            this.accessToken = tokens.access_token;
            this.refreshToken = tokens.refresh_token;
            this.expiresAt = tokens.expires_at;
            await this.onTokenRefresh?.({
                accessToken: this.accessToken,
                refreshToken: this.refreshToken,
                expiresAt: this.expiresAt,
            });
        })().finally(() => (this.pendingRefresh = undefined));
        return this.pendingRefresh;
    }

    private canRefresh = () => Boolean(this.refreshToken && this.clientId && this.clientSecret);

    private expiresSoon = () => this.expiresAt !== undefined && this.expiresAt * 1000 - Date.now() < REFRESH_MARGIN_MS;

    /**
     * Send a request to the Strava API, throw a StravaError if the response is not ok.
     * query values set to undefined are skipped, arrays are joined with ","
     */
    async request<T>(method: string, path: string, options: IRequestOptions = {}): Promise<T> {
        const url = new URL(path.startsWith("http") ? path : `${this.baseUrl}${path}`);
        for (const [key, value] of Object.entries(options.query ?? {})) {
            if (value !== undefined) url.searchParams.set(key, String(value));
        }

        const auth = options.auth !== false;
        if (auth && this.canRefresh() && this.expiresSoon()) await this.refreshAccessToken();

        let response = await this.send(method, url, options);
        // the token may have been revoked or expired without expiresAt: refresh and replay once
        if (response.status === 401 && auth && this.canRefresh()) {
            await this.refreshAccessToken();
            response = await this.send(method, url, options);
        }

        if (!response.ok) throw await StravaError.fromResponse(response);
        return options.text ? (response.text() as Promise<T>) : response.json();
    }

    // one http call, retried on 429 and 5xx up to maxRetries
    private async send(method: string, url: URL, options: IRequestOptions): Promise<Response> {
        const headers: Record<string, string> = options.auth === false ? {} : this.getAuthHeader();
        let body: FormData | URLSearchParams | string | undefined = options.form;
        if (options.body !== undefined) {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(options.body);
        }

        for (let attempt = 0; ; attempt++) {
            const start = Date.now();
            const response = await fetch(url, { method, headers, body });
            this.logger?.({ method, url: url.toString(), status: response.status, durationMs: Date.now() - start });
            this.rateLimit = parseRateLimit(response.headers) ?? this.rateLimit;

            const retryable = response.status === 429 || response.status >= 500;
            if (!retryable || attempt >= this.maxRetries) return response;
            await new Promise(resolve => setTimeout(resolve, RETRY_BASE_DELAY_MS * 2 ** attempt));
        }
    }
}

export default StravaApi;
