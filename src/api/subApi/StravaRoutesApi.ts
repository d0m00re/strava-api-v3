import * as entity from "../../entity/strava.entity";
import StravaApi from "./../StravaApi";

interface IGetRouteAsGPX {
    id: number;//required Long, in path 	The iden
}

interface IGetRouteAsTCX {
    id: number;//required Long, in path 	The identifier of the route. 
}

interface IGetRouteById {
    id: number;//required Long, in path 	The ident
}

interface IGetRouteStreams {
    id: number;
}

class StravaRoutesApi {
    stravaApi : StravaApi;
    constructor (stravaApi : StravaApi) {
        this.stravaApi = stravaApi;
    }

    /**
     * 
    * Export Route GPX (getRouteAsGPX)
    * Returns a GPX file of the route. Requires read_all scope for private routes.
    * @return gpx file ??? 
    */
    async getRouteAsGPX(props: IGetRouteAsGPX): Promise<any> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}/routes/${props.id}/export_gpx`;
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
     * Export Route TCX (getRouteAsTCX)
     * Returns a TCX file of the route. Requires read_all scope for private routes.
     */
    async getRouteAsTCX(props: IGetRouteAsTCX): Promise<any> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}}/routes/${props.id}/export_tsx`;
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
     *  Get Route (getRouteById)
     * Returns a route using its identifier. Requires read_all scope for private routes.
     */
    async getRouteById(props: IGetRouteById): Promise<entity.IRoute> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}}/routes/${props.id}`;
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
     * Get Route Streams (getRouteStreams)
     * Returns the given route's streams. Requires read_all scope for private routes.
     */
        async getRouteStreams(props: IGetRouteStreams): Promise<entity.IStreamSet> {
            try {
                let url = `${this.stravaApi.getBaseUrl()}/routes/${props.id}/streams`;
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
export default StravaRoutesApi;