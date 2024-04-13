import StravaApi from "./../Strava.api";

interface IRetrieveAccessTokenWtRefreshToken {
    token_type : string;
    access_token : string;
    expires_at : number;
    expires_in : number;
    refresh_token : string;
}

// maybe replace athlete later by IAthlete type
// after check this type mismatch with the other object ...
interface IOutputGetTokenFromAuth {
    token_type: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string,
    access_token: string,
    athlete: {
      id: number,
      username: null | string;
      resource_state: number;
      firstname: string;
      lastname: string;
      bio: string;
      city: string;
      state: string;
      country: null | string,
      sex: string;
      premium: boolean;
      summit: boolean;
      created_at: string;
      updated_at: string;
      badge_type_id: number;
      weight: number;
      profile_medium: string;
      profile: string;
      friend: null | any,
      follower: null | any;
    }
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
type TAuthorization = "read" | "read_all" | "profile:read_all" | "profile:write" | "activity:read" | "activity:read_all" | "activity:write" | "t_allAuth";
//scope=read,activity:write
const allAuth = `read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write`;

class StravaAuth0Api {
    stravaApi: StravaApi;
    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    getAskAuthUrl(authToAsk : TAuthorization | string) {
        let scope = (authToAsk === "t_allAuth") ? allAuth : authToAsk;
        return `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=http://localhost&response_type=code&scope=${scope}`;
    }

    async getTokenFromAuth(authorizationCode: string): Promise<IOutputGetTokenFromAuth> {
        try {
            let url = `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${authorizationCode}&grant_type=authorization_code`;
            
            // require post request - retrieve new access and refresh token from strava api
            const resp = await fetch(url, {method : "POST"}).then(resp => resp.json());
            console.log("resp : ");
            console.log(resp);
      
           return resp;
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    async retrieveAccessTokenWtRefreshToken(refreshToken : string) : Promise<IRetrieveAccessTokenWtRefreshToken> {
        try {
            const url = `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&refresh_token=${refreshToken}&grant_type=refresh_token`;
            const resp = await fetch(url, {method : "POST"}).then(resp => resp.json());
            console.log("resp : ");
            console.log(resp);
            return resp;
        }
        catch(error) {
            console.error('Error fetching retrieveAccessTokenWtRefreshToken', error);
            throw error;
        }
    }
}
export default StravaAuth0Api;