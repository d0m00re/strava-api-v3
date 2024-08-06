import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface ICreateUpload {
    file: File | Buffer | string | any;// ReadStream // File, in form 	The uploaded file.
    name: string; //String, in form 	The desired name of the resulting activity.
    description: string; //String, in form 	The desired description of the resulting activity.
    trainer: string; //String, in form 	Whether the resulting activity should be marked as having been performed on a trainer.
    commute: string;//String, in form 	Whether the resulting activity should be tagged as a commute.
    data_type: "fit" | "fit.gz" | "tcx" | "tcx.gz" | "gpx" | "gpx.gz"; //String, in form 	The format of the uploaded file. May take one of the following values: fit, fit.gz, tcx, tcx.gz, gpx, gpx.gz
    external_id: string;// String, in form 	The desired external identifier of the resulting activity. 
}

interface IGetUploadById {
    uploadId: number;//required Long, in path 	The identifier of the upload. 
}

class StravaUploadApi {
    stravaApi: StravaApi;
    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    /**
     * Upload Activity (createUpload)
     * Uploads a new data file to create an activity from. Requires activity:write scope.
     */
    async createUpload(props: ICreateUpload): Promise<entity.IUpload> {
        try {
            const url = `${this.stravaApi.getBaseUrl()}/uploads`;
            const response = await fetch(url, {
                headers: this.stravaApi.getAuthHeader(),
                method: "POST",
                body: JSON.stringify(props)
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }
    /**
     * Get Upload (getUploadById)
     * Returns an upload for a given identifier. Requires activity:write scope.
     */
    async getUploadById(props: IGetUploadById): Promise<entity.IUpload> {
        try {
            const url = `${this.stravaApi.getBaseUrl()}/uploads/${props.uploadId}`;
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
export default StravaUploadApi;