import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface IGetGearById {
    id: string;//required String, in path 	The identifier of the gear. 
}

class StravaGearApi {
    stravaApi: StravaApi;
    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    /**
     * gear
     */
    async getGearById(props: IGetGearById): Promise<entity.IDetailedGear> {
        try {
            const url = `${this.stravaApi.getBaseUrl()}/gear/${props.id}`;
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
export default StravaGearApi;