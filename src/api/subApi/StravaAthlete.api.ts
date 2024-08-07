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

    // http get "https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=" "Authorization: Bearer [[token]]"
    async getLoggedInAthleteActivities(props: IGetLoggedInAthleteActivities): Promise<entity.ISummaryActivity[]> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}/athlete/activities?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            //before=${props.before}&after=${props.after}&
            if (props.before !== undefined)
                url = `${url}&before=${props.before}`;

            if (props.after !== undefined)
                url = `${url}&after=${props.after}`;

            const response = await fetch(url, {
                headers: this.stravaApi.getAuthHeader(),
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }

    /**
     * Get Authenticated Athlete (getLoggedInAthlete)
     * Returns the currently authenticated athlete. Tokens with profile:read_all scope will receive a detailed athlete representation; all others will receive a summary representation.
     * @returns 
     */
    async getLoggedInAthlete(): Promise<entity.IDetailedAthlete> {
        try {
            const response = await fetch(`${this.stravaApi.getBaseUrl()}/athlete`, {
                headers: this.stravaApi.getAuthHeader(),
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
    * Get Zones (getLoggedInAthleteZones)
    * @returns Returns the the authenticated athlete's heart rate and power zones. Requires profile:read_all.
    */
    async getLoggedInAthleteZones(): Promise<entity.IZone> {
        try {
            const response = await fetch(`${this.stravaApi.getBaseUrl()}/athlete/zones`, {
                headers: this.stravaApi.getAuthHeader(),
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
    * 
    * @param props 
    * Get Athlete Stats (getStats)
    * Returns the activity stats of an athlete. Only includes data from activities set to Everyone visibilty.
    * @returns 
    */
    async getStats(props: IGetStats): Promise<entity.IActivitiesStats> {
        try {
            const response = await fetch(`${this.stravaApi.getBaseUrl()}/athletes/${props.id}/stats`, {
                headers: this.stravaApi.getAuthHeader(),
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
    * Update Athlete (updateLoggedInAthlete)
    * Update the currently authenticated athlete. Requires profile:write scope.
    * @param props 
    * @returns 
    */
    async updateLoggedInAthlete(props: IUpdateLoggedInAthlete): Promise<entity.IDetailedAthlete> {
        try {
            const url = `${this.stravaApi.getBaseUrl()}/athlete?weight=${props.weight}`;
            const response = await fetch(url, {
                headers: this.stravaApi.getAuthHeader(),
                method: "PUT"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
* Returns a list of the clubs whose membership includes the authenticated athlete.
*/
    async getLoggedInAthleteClubs(props: IGetLoggedInAthleteClubs): Promise<entity.ISummaryClub[]> {
        try {
            const url = `${this.stravaApi.getBaseUrl()}/athlete/clubs?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: this.stravaApi.getAuthHeader(),
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
 *  List Athlete Routes (getRoutesByAthleteId)
 * Returns a list of the routes created by the authenticated athlete. Private routes are filtered out unless requested by a token with read_all scope.
 */
    async getRoutesByAthleteId(props: IGetRoutesByAthleteId): Promise<entity.IRoute[]> {
        try {
            const url = `${this.stravaApi.getBaseUrl()}/athletes/${props.id}/routes?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: this.stravaApi.getAuthHeader(),
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }
}
export default StravaAthleteApi;