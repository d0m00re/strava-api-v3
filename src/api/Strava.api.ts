import * as subApi from "./subApi";

interface IStravaApi {
    accessToken: string;
    clientId: string;
    clientSecret: string;
    refreshToken?: string;
}

class StravaApi {
    private accessToken: string;
    private refreshToken: string;
    private clientId: string;
    private clientSecret: string;
    private baseUrl: string = "https://www.strava.com/api/v3";

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
    setBaseUrl = (baseUrl: string) => this.baseUrl = baseUrl;

    getClientId = () => this.clientId;
    setClientId = (clientId: string) => this.clientId = clientId;

    getClientSecret = () => this.clientSecret;
    setClientSecret = (clientSecret: string) => this.clientSecret = clientSecret;

    getAccessToken = () => this.accessToken;
    setAccessToken = (accessToken: string) => this.accessToken = accessToken;

    getRefreshToken = () => this.refreshToken;
    setRefreshToken = (refreshToken: string) => this.refreshToken = refreshToken;

    getAuthHeader = () => ({ 'Authorization': `Bearer ${this.accessToken}` });
}

export default StravaApi;