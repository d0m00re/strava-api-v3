import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface IGetClubActivitiesById {
    id: number;//required Long, in path 	The identifier of the club.
    page?: number;//Integer, in query 	Page number. Defaults to 1.
    per_page?: number;//Integer, in query 	Number of items per page. Defaults to 30. 
}

interface IGetClubAdminsById {
    id: number;//required Long, in path 	The identifier of the club.
    page?: number;//Integer, in query 	Page number. Defaults to 1.
    per_page?: number;// Integer, in query 	Number of items per page. Defaults to 30. 
}

interface IGetClubById {
    id: number;
}

interface IGetClubMembersById {
    id: number;//required Long, in path 	The identifier of the club.
    page?: number;//Integer, in query 	Page number. Defaults to 1.
    per_page?: number;//Integer, in query 	Number of items per page. Defaults to 30. 
}

class StravaClubApi {
    stravaApi: StravaApi;

    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    async getClubActivitiesById(props: IGetClubActivitiesById): Promise<entity.IClubActivity[]> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}/clubs/${props.id}/activities?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
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
     * 
     * @param props 
     * @returns Returns a list of the administrators of a given club.
     */
    async getClubAdminsById(props: IGetClubAdminsById): Promise<entity.ISummaryAthlete[]> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}/clubs/${props.id}/admins?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
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

    async getClubById(props: IGetClubById): Promise<entity.IDetailedClub> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}/clubs/${props.id}`;
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
     * Returns a list of the athletes who are members of a given club.
     */
    async getClubMembersById(props: IGetClubMembersById): Promise<entity.IClubAthlete[]> {
        try {
            let url = `${this.stravaApi.getBaseUrl()}/clubs/${props.id}/members?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
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
export default StravaClubApi;