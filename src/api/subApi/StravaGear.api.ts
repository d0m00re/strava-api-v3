import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface IGetGearById {
    id: string; //required String, in path 	The identifier of the gear.
}

class StravaGearApi {
    stravaApi: StravaApi;
    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    /**
     * Get Equipment (getGearById)
     * Returns an equipment using its identifier.
     */
    async getGearById(props: IGetGearById): Promise<entity.IDetailedGear> {
        return this.stravaApi.request("GET", `/gear/${props.id}`);
    }
}
export default StravaGearApi;
