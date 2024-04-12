import * as entity from "./../entity/strava.entity";
import * as subApi from "./subApi";



interface IStravaApi {
    accessToken : string;
    clientId : string;
    clientSecret : string;
    refreshToken ?: string;
}

class StravaApi {
    private accessToken: string;
    private refreshToken : string;
    private clientId : string;
    private clientSecret : string;
    private baseUrl: string = "https://www.strava.com/api/v3";
    
    public activity : subApi.StravaActivityApi;
    public athlete : subApi.StravaAthleteApi;
    public club : subApi.StravaClubApi;
    public gear : subApi.StravaGearApi;
    public route : subApi.StravaRoutesApi;
    public segment : subApi.StravaSegmentApi;
    public segmentEffort : subApi.StravaSegmentEffortsApi;
    public upload : subApi.StravaUploadApi;
    
    constructor(props : IStravaApi) {
        this.accessToken = props.accessToken;
        this.clientId = props.clientId;
        this.clientSecret = props.clientSecret;
        this.refreshToken = props.refreshToken ?? "";

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
    getClientId= () => this.clientId;
    getClientSecret = () => this.clientSecret;
    getAccessToken = () => this.accessToken;
    getRefreshToken = () => this.refreshToken;
    getAuthHeader = () => ({
        'Authorization': `Bearer ${this.accessToken}`
    });



    /*
    async authTest(props : any) {
        try {
            let url = `https://www.strava.com/api/v3/oauth/token`;

            const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
                method : "POST",
                body : JSON.stringify({
                    client_id : process.env.STRAVA_CLIENT_ID,
                    client_secret : process.env.STRAVA_CLIENT_SECRET,
                    code : process.env.STRAVA_CLIENT_ID,
                    grant_type : 'authorization_code'

                })
            })
        }
    
    }

    // auth0 test
    */
}

export default StravaApi;