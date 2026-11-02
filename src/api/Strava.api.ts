import * as subApi from "./subApi";
import { StravaError } from "./StravaError";

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

interface IStravaApi {
    accessToken: string;
    clientId: string;
    clientSecret: string;
    refreshToken?: string;
    logger?: (log: IRequestLog) => void; // called after each request
}

class StravaApi {
    private accessToken: string;
    private refreshToken: string;
    private clientId: string;
    private clientSecret: string;
    private baseUrl: string = "https://www.strava.com/api/v3";
    private logger?: (log: IRequestLog) => void;

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

    getAuthHeader = () => ({ Authorization: `Bearer ${this.accessToken}` });

    /**
     * Send a request to the Strava API, throw a StravaError if the response is not ok.
     * query values set to undefined are skipped, arrays are joined with ","
     */
    async request<T>(method: string, path: string, options: IRequestOptions = {}): Promise<T> {
        const url = new URL(path.startsWith("http") ? path : `${this.baseUrl}${path}`);
        for (const [key, value] of Object.entries(options.query ?? {})) {
            if (value !== undefined) url.searchParams.set(key, String(value));
        }

        const headers: Record<string, string> = options.auth === false ? {} : this.getAuthHeader();
        let body: FormData | URLSearchParams | string | undefined = options.form;
        if (options.body !== undefined) {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(options.body);
        }

        const start = Date.now();
        const response = await fetch(url, { method, headers, body });
        this.logger?.({ method, url: url.toString(), status: response.status, durationMs: Date.now() - start });
        if (!response.ok) throw await StravaError.fromResponse(response);
        return options.text ? (response.text() as Promise<T>) : response.json();
    }
}

export default StravaApi;
