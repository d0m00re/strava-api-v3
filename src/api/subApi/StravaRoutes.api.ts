import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface IGetRouteAsGPX {
    id: string; //required Long, in path 	The iden
}

interface IGetRouteAsTCX {
    id: string; //required Long, in path 	The identifier of the route.
}

interface IGetRouteById {
    id: string; //required Long, in path 	The ident
}

interface IGetRouteStreams {
    id: number | string;
}

class StravaRoutesApi {
    stravaApi: StravaApi;
    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    /**
     * Export Route GPX (getRouteAsGPX)
     * Returns a GPX file of the route. Requires read_all scope for private routes.
     * @returns the gpx file content
     */
    async getRouteAsGPX(props: IGetRouteAsGPX): Promise<string> {
        return this.stravaApi.request("GET", `/routes/${props.id}/export_gpx`, { text: true });
    }

    /**
     * Export Route TCX (getRouteAsTCX)
     * Returns a TCX file of the route. Requires read_all scope for private routes.
     * @returns the tcx file content
     */
    async getRouteAsTCX(props: IGetRouteAsTCX): Promise<string> {
        return this.stravaApi.request("GET", `/routes/${props.id}/export_tcx`, { text: true });
    }

    /**
     * Get Route (getRouteById)
     * Returns a route using its identifier. Requires read_all scope for private routes.
     */
    async getRouteById(props: IGetRouteById): Promise<entity.IRoute> {
        return this.stravaApi.request("GET", `/routes/${props.id}`);
    }

    /**
     * Get Route Streams (getRouteStreams)
     * Returns the given route's streams. Requires read_all scope for private routes.
     */
    async getRouteStreams(props: IGetRouteStreams): Promise<entity.IStreamRouteSetCorrect[]> {
        return this.stravaApi.request("GET", `/routes/${props.id}/streams`);
    }
}
export default StravaRoutesApi;
