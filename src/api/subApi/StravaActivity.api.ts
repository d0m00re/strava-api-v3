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
    body: Partial<entity.IUpdatableActivity>
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

    /**
     * Create an Activity (createActivity)
     * Creates a manual activity for an athlete. Requires activity:write scope.
     */
    async createActivity(props: ICreateActivity): Promise<entity.IDetailedActivity> {
        return this.stravaApi.request("POST", "/activities", { body: props });
    }

    /**
     * Returns the given activity that is owned by the authenticated athlete. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     */
    async getActivityById(props: IGetActivityById): Promise<entity.IDetailedActivity> {
        return this.stravaApi.request("GET", `/activities/${props.id}`, {
            query: { include_all_efforts: props.include_all_efforts }
        });
    }

    /**
     * List Activity Comments (getCommentsByActivityId)
     * Returns the comments on the given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     */
    async getCommentsByActivityId(props: IGetActivityComments): Promise<entity.IComment[]> {
        return this.stravaApi.request("GET", `/activities/${props.id}/comments`, {
            query: { page_size: props.page_size ?? 30, after_cursor: props.after_cursor }
        });
    }

    /**
     * List Activity Kudoers (getKudoersByActivityId)
     * Returns the athletes who kudoed an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     */
    async getKudoersByActivityId(props: IGetKudoersByActivityId): Promise<entity.ISummaryAthlete[]> {
        return this.stravaApi.request("GET", `/activities/${props.id}/kudos`, {
            query: { page: props.page ?? 1, per_page: props.per_page ?? 30 }
        });
    }

    /**
     * List Activity Laps (getLapsByActivityId)
     * Returns the laps of an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     */
    async getLapsByActivityId(props: IGetLapsByActivityId): Promise<entity.ILap[]> {
        return this.stravaApi.request("GET", `/activities/${props.id}/laps`);
    }

    /**
     * Get Activity Zones (getZonesByActivityId)
     * Summit Feature. Returns the zones of a given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     */
    async getZonesByActivityId(props: IGetZonesByActivityId): Promise<entity.IActivityZone[]> {
        return this.stravaApi.request("GET", `/activities/${props.id}/zones`);
    }

    /**
     * Update Activity (updateActivityById)
     * Updates the given activity that is owned by the authenticated athlete. Requires activity:write.
     */
    async updateActivityById(props: IUpdateActivityById): Promise<entity.IDetailedActivity> {
        return this.stravaApi.request("PUT", `/activities/${props.id}`, { body: props.body });
    }

    // ========================== stream
    /**
     * Get Activity Streams (getActivityStreams)
     * Returns the given activity's streams. Requires activity:read scope. Requires activity:read_all scope for Only Me activities.
     */
    async getActivityStreams(props: IGetActivityStreams): Promise<entity.IStreamSet> {
        return this.stravaApi.request("GET", `/activities/${props.id}/streams`, {
            query: { keys: props.keys, key_by_type: props.key_by_type }
        });
    }
}

export default StravaActivityApi;
