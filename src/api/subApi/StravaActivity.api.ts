import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface ICreateActivity {
    name: string;//required String, in form 	The name of the activity.
    type?: string;//String, in form 	Type of activity. For example - Run, Ride etc.
    sport_type: string; //required String, in form 	Sport type of activity. For example - Run, MountainBikeRide, Ride, etc.
    start_date_local: string; //required Date, in form 	ISO 8601 formatted date time.
    elapsed_time: number;//required Integer, in form 	In seconds.
    description?: string;//String, in form 	Description of the activity.
    distance?: number;//Float, in form 	In meters.
    trainer?: number;//Integer, in form 	Set to 1 to mark as a trainer activity.
    commute?: number;//Integer, in form 	Set to 1 to mark as commute. 
}

interface IGetActivityById {
    id: number;
    include_all_efforts?: boolean;
}

interface IGetActivityComments {
    id: number;
    page_size?: number;
    after_cursor?: string;
}

interface IGetKudoersByActivityId {
    id: number;
    page?: number;
    per_page?: number;
}

interface IGetLapsByActivityId {
    id: number;
}

interface IGetZonesByActivityId {
    id: number;
}

interface IUpdateActivityById {
    id: number;
    body: entity.IUpdatableActivity
}


interface IGetActivityStreams {
    id: number | string; //required Long, in path 	The identifier of the activity.
    keys: entity.TKeysPossibleType[]; //required array[String], in query 	Desired stream types. May take one of the following values:
    key_by_type: boolean;//required Boolean, in query 	Must be true. 
}

class StravaActivityApi {
    stravaApi: StravaApi;
    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    async createActivity(props: ICreateActivity): Promise<entity.IDetailedActivity> {
        try {
            const response = await fetch(`${this.stravaApi.getBaseUrl()}/activities`, {
                headers: this.stravaApi.getAuthHeader(),
                method: "POST"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
* 
* Returns the given activity that is owned by the authenticated athlete. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
* @param props 
* @returns 
*/
    async getActivityById(props: IGetActivityById): Promise<entity.IDetailedActivity> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}/activities/${props.id}`;
            if (props.include_all_efforts) {
                url = `${url}?include_all_efforts`;
            }

            const response = await fetch(`${this.stravaApi.getBaseUrl()}/activities/${props.id}`, {
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
 * 
 * List Activity Comments (getCommentsByActivityId)
 * Returns the comments on the given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
 * @param props 
 * @returns 
 */
    async getCommentsByActivityId(props: IGetActivityComments): Promise<entity.IComment[]> {
        const { id, ...body } = props;

        try {
            let url = `${this.stravaApi.getBaseUrl()}/activities/${props.id}/comments`;
            url = `${url}?page_size=${props.page_size ?? 30}`;
            if (props.after_cursor)
                url = `${url}&after_cursor=${props.after_cursor}`;

            const response = await fetch(url, {
                headers: this.stravaApi.getAuthHeader(),
                method: "GET"
            }).then(resp => {
                console.log("resp")
                console.log(resp)
                return resp.json()
            });

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }

    /**
* List Activity Kudoers (getKudoersByActivityId)
* Returns the athletes who kudoed an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
* @param props 
* @returns 
*/
    async getKudoersByActivityId(props: IGetKudoersByActivityId): Promise<entity.ISummaryAthlete[]> {
        const { id, ...body } = props;

        try {
            let url = `${this.stravaApi.getBaseUrl()}/activities/${props.id}/kudos`;
            url = `${url}?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
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
 * 
 * List Activity Laps (getLapsByActivityId)
 * Returns the laps of an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
 */
    async getLapsByActivityId(props: IGetLapsByActivityId): Promise<entity.ILap[]> {
        const { id, ...body } = props;

        try {
            const response = await fetch(`${this.stravaApi.getBaseUrl()}/activities/${props.id}/laps`, {
                headers: this.stravaApi.getAuthHeader(),
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }

    // http get "https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=" "Authorization: Bearer [[token]]"
    async getZonesByActivityId(props: IGetZonesByActivityId): Promise<entity.IActivityZone[]> {
        try {
            const url = `${this.stravaApi.getBaseUrl()}/activities/${props.id}/zones`;
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

    async updateActivityById(props: IUpdateActivityById): Promise<entity.IUpdatableActivity> {
        try {
            const url = `${this.stravaApi.getBaseUrl()}/activities/${props.id}`;
            const response = await fetch(url, {
                headers: this.stravaApi.getAuthHeader(),
                body: JSON.stringify(props.body),
                method: "PUT"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }

    // ========================== stream
    /**
     * Get Activity Streams (getActivityStreams)
     * Returns the given activity's streams. Requires activity:read scope. Requires activity:read_all scope for Only Me activities.
     */
    async getActivityStreams(props: IGetActivityStreams): Promise<entity.IStreamSet> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}/activities/${props.id}/streams`;
            url = `${url}?keys=${props.keys.join(",")}&key_by_type=${(props.key_by_type) ? "true" : "false"}`
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

    //GET
	//https://www.strava.com/activities/12087149535/export_gpx
    // not present inside documentation ...
    async getActivitiesGpxById(id : string | number): Promise<any> {
        try {
            const url = `${this.stravaApi.getBaseUrl()}/activities/${id}/export_gpx`;
            console.log(`----> ${url}`)
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

export default StravaActivityApi;