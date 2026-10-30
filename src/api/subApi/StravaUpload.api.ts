import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface ICreateUpload {
    file: Blob | Uint8Array | string;// File, in form 	The uploaded file. (Buffer works too, string = file content)
    name?: string; //String, in form 	The desired name of the resulting activity.
    description?: string; //String, in form 	The desired description of the resulting activity.
    trainer?: string; //String, in form 	Whether the resulting activity should be marked as having been performed on a trainer.
    commute?: string;//String, in form 	Whether the resulting activity should be tagged as a commute.
    data_type: "fit" | "fit.gz" | "tcx" | "tcx.gz" | "gpx" | "gpx.gz"; //String, in form 	The format of the uploaded file. May take one of the following values: fit, fit.gz, tcx, tcx.gz, gpx, gpx.gz
    external_id?: string;// String, in form 	The desired external identifier of the resulting activity.
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
        const { file, ...fields } = props;
        const form = new FormData();
        form.append("file", file instanceof Blob ? file : new Blob([file]), `activity.${props.data_type}`);
        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined) form.append(key, value);
        }
        return this.stravaApi.request("POST", "/uploads", { form });
    }

    /**
     * Get Upload (getUploadById)
     * Returns an upload for a given identifier. Requires activity:write scope.
     */
    async getUploadById(props: IGetUploadById): Promise<entity.IUpload> {
        return this.stravaApi.request("GET", `/uploads/${props.uploadId}`);
    }
}
export default StravaUploadApi;
