import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface IGetEffortsBySegmentId {
    segment_id: number;//required Integer, in query 	The identifier of the segment.
    start_date_local?: string;//Date, in query 	ISO 8601 formatted date time.
    end_date_local?: string;//Date, in query 	ISO 8601 formatted date time.
    per_page?: number;//Integer, in query 	Number of it
}

interface IGetSegmentEffortById {
    id: number | string;//id of the segment effort
}

interface IGetSegmentEffortStreams {
    id: number | string;//required Long, in path 	The identifier of the segment effort.
    keys: entity.TKeysPossibleType[];//[]required array[String], in query 	The types of streams to return. May take one of the following values:
    key_by_type: boolean; //required Boolean, in query 	Must be true. 
}

class StravaSegmentEffortsApi {
    stravaApi: StravaApi;
    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    /**
* List Segment Efforts (getEffortsBySegmentId)
* Returns a set of the authenticated athlete's segment efforts for a given segment.
* Requires subscription.
*/
    async getEffortsBySegmentId(props: IGetEffortsBySegmentId): Promise<entity.IDetailedSegmentEffort[]> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}/segment_efforts?segment_id=${props.segment_id}`

            if (props.start_date_local)
                url = `${url}&start_date_local=${props.start_date_local}`;
            if (props.end_date_local)
                url = `${url}&end_date_local=${props.end_date_local}`;
            if (props.per_page)
                url = `${url}&per_page=${props.per_page ?? 30}`;

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
     *  Get Segment Effort (getSegmentEffortById)
     * Returns a segment effort from an activity that is owned by the authenticated athlete. Requires subscription.
     */
    async getSegmentEffortById(props: IGetSegmentEffortById): Promise<entity.IDetailedSegmentEffort> {
        try {
            const url = `${this.stravaApi.getBaseUrl()}/segment_efforts/${props.id}`;
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
 * Get Segment Effort Streams (getSegmentEffortStreams)
 * Returns a set of streams for a segment effort completed by the authenticated athlete. Requires read_all scope.
 */
    async getSegmentEffortStreams(props: IGetSegmentEffortStreams): Promise<entity.IStreamSet> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}/segment_efforts/${props.id}/streams`;
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
}
export default StravaSegmentEffortsApi;