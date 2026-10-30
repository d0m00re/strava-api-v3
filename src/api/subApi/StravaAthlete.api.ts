import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface IGetLoggedInAthleteActivities {
    before?: number;//Integer, in query 	An epoch timestamp to use for filtering activities that have taken place before a certain time.
    after?: number;//Integer, in query 	An epoch timestamp to use for filtering activities that have taken place after a certain time.
    page: number;//Integer, in query 	Page number. Defaults to 1.
    per_page: number;// Number of items per page. Defaults to 30.
}

interface IGetStats {
    id: number;
}

interface IUpdateLoggedInAthlete {
    weight: number;//required Float, in path 	The weight of the athlete in kilograms.
}

interface IGetLoggedInAthleteClubs {
    page?: number;//Integer, in query 	Page number. Defaults to 1.
    per_page?: number;//Integer, in query 	Number of items per page. Defaults to 30.
}

interface IGetRoutesByAthleteId {
    id: number;
    page: number;//Integer, in query 	Page number. Defaults to 1.
    per_page: number;// Integer, in query 	Number of i
}

class StravaAthleteApi {
    stravaApi: StravaApi;
    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    /**
     * List Athlete Activities (getLoggedInAthleteActivities)
     * Returns the activities of an athlete for a specific identifier. Requires activity:read. Only Me activities will be filtered out unless requested by a token with activity:read_all.
     */
    async getLoggedInAthleteActivities(props: IGetLoggedInAthleteActivities): Promise<entity.ISummaryActivity[]> {
        return this.stravaApi.request("GET", "/athlete/activities", {
            query: { page: props.page ?? 1, per_page: props.per_page ?? 30, before: props.before, after: props.after }
        });
    }

    /**
     * Get Authenticated Athlete (getLoggedInAthlete)
     * Returns the currently authenticated athlete. Tokens with profile:read_all scope will receive a detailed athlete representation; all others will receive a summary representation.
     */
    async getLoggedInAthlete(): Promise<entity.IDetailedAthlete> {
        return this.stravaApi.request("GET", "/athlete");
    }

    /**
     * Get Zones (getLoggedInAthleteZones)
     * Returns the the authenticated athlete's heart rate and power zones. Requires profile:read_all.
     */
    async getLoggedInAthleteZones(): Promise<entity.IZone> {
        return this.stravaApi.request("GET", "/athlete/zones");
    }

    /**
     * Get Athlete Stats (getStats)
     * Returns the activity stats of an athlete. Only includes data from activities set to Everyone visibilty.
     */
    async getStats(props: IGetStats): Promise<entity.IActivitiesStats> {
        return this.stravaApi.request("GET", `/athletes/${props.id}/stats`);
    }

    /**
     * Update Athlete (updateLoggedInAthlete)
     * Update the currently authenticated athlete. Requires profile:write scope.
     */
    async updateLoggedInAthlete(props: IUpdateLoggedInAthlete): Promise<entity.IDetailedAthlete> {
        return this.stravaApi.request("PUT", "/athlete", { query: { weight: props.weight } });
    }

    /**
     * Returns a list of the clubs whose membership includes the authenticated athlete.
     */
    async getLoggedInAthleteClubs(props: IGetLoggedInAthleteClubs): Promise<entity.ISummaryClub[]> {
        return this.stravaApi.request("GET", "/athlete/clubs", {
            query: { page: props.page ?? 1, per_page: props.per_page ?? 30 }
        });
    }

    /**
     * List Athlete Routes (getRoutesByAthleteId)
     * Returns a list of the routes created by the authenticated athlete. Private routes are filtered out unless requested by a token with read_all scope.
     */
    async getRoutesByAthleteId(props: IGetRoutesByAthleteId): Promise<entity.IRoute[]> {
        return this.stravaApi.request("GET", `/athletes/${props.id}/routes`, {
            query: { page: props.page ?? 1, per_page: props.per_page ?? 30 }
        });
    }
}
export default StravaAthleteApi;
