// todo : rework naming
import StravaApi from "./../Strava.api";

interface IRetrieveAccessTokenWtRefreshToken {
    token_type: string;
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
}

// maybe replace athlete later by IAthlete type
// after check this type mismatch with the other object ...
interface IOutputGetTokenFromAuth {
    token_type: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    access_token: string;
    athlete: {
        id: number;
        username: null | string;
        resource_state: number;
        firstname: string;
        lastname: string;
        bio: string;
        city: string;
        state: string;
        country: null | string;
        sex: string;
        premium: boolean;
        summit: boolean;
        created_at: string;
        updated_at: string;
        badge_type_id: number;
        weight: number;
        profile_medium: string;
        profile: string;
        friend: null | any;
        follower: null | any;
    };
}

/**
 *
    read: read public segments, public routes, public profile data, public posts, public events, club feeds, and leaderboards
    read_all:read private routes, private segments, and private events for the user
    profile:read_all: read all profile information even if the user has set their profile visibility to Followers or Only You
    profile:write: update the user's weight and Functional Threshold Power (FTP), and access to star or unstar segments on their behalf
    activity:read: read the user's activity data for activities that are visible to Everyone and Followers, excluding privacy zone data
    activity:read_all: the same access as activity:read, plus privacy zone data and access to read the user's activities with visibility set to Only You
    activity:write: access to create manual activities and uploads, and access to edit any activities that are visible to the app, based on activity read access level
 */
type TAuthorization =
    | "read"
    | "read_all"
    | "profile:read_all"
    | "profile:write"
    | "activity:read"
    | "activity:read_all"
    | "activity:write"
    | "t_allAuth";
//scope=read,activity:write
const allAuth = `read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write`;

class StravaAuth0Api {
    stravaApi: StravaApi;
    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    /**
     * Url where the user grants access to the app, Strava then redirects to redirectUri with a `code` param.
     */
    getAskAuthUrl(authToAsk: TAuthorization | string, redirectUri: string = "http://localhost") {
        const url = new URL("https://www.strava.com/oauth/authorize");
        url.searchParams.set("client_id", this.stravaApi.getClientId());
        url.searchParams.set("redirect_uri", redirectUri);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("scope", authToAsk === "t_allAuth" ? allAuth : authToAsk);
        return url.toString();
    }

    /**
     * Exchange the authorization code from getAskAuthUrl for an access and refresh token.
     */
    async getTokenFromAuth(authorizationCode: string): Promise<IOutputGetTokenFromAuth> {
        return this.postToken<IOutputGetTokenFromAuth>({ code: authorizationCode, grant_type: "authorization_code" });
    }

    /**
     * Get a new access token with a refresh token.
     */
    async retrieveAccessTokenWtRefreshToken(refreshToken: string): Promise<IRetrieveAccessTokenWtRefreshToken> {
        return this.postToken<IRetrieveAccessTokenWtRefreshToken>({
            refresh_token: refreshToken,
            grant_type: "refresh_token",
        });
    }

    // secrets are sent in the body, never in the url
    private async postToken<T>(params: Record<string, string>): Promise<T> {
        const form = new URLSearchParams({
            client_id: this.stravaApi.getClientId(),
            client_secret: this.stravaApi.getClientSecret(),
            ...params,
        });
        return this.stravaApi.request("POST", "https://www.strava.com/oauth/token", { form, auth: false });
    }
}
export default StravaAuth0Api;
