import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface IGetClubActivitiesById {
    id: number; //required Long, in path 	The identifier of the club.
    page?: number; //Integer, in query 	Page number. Defaults to 1.
    per_page?: number; //Integer, in query 	Number of items per page. Defaults to 30.
}

interface IGetClubAdminsById {
    id: number; //required Long, in path 	The identifier of the club.
    page?: number; //Integer, in query 	Page number. Defaults to 1.
    per_page?: number; // Integer, in query 	Number of items per page. Defaults to 30.
}

interface IGetClubById {
    id: number;
}

interface IGetClubMembersById {
    id: number | string; //required Long, in path 	The identifier of the club.
    page?: number; //Integer, in query 	Page number. Defaults to 1.
    per_page?: number; //Integer, in query 	Number of items per page. Defaults to 30.
}

class StravaClubApi {
    stravaApi: StravaApi;

    constructor(stravaApi: StravaApi) {
        this.stravaApi = stravaApi;
    }

    /**
     * List Club Activities (getClubActivitiesById)
     * Retrieve recent activities from members of a specific club.
     */
    async getClubActivitiesById(props: IGetClubActivitiesById): Promise<entity.IClubActivity[]> {
        return this.stravaApi.request("GET", `/clubs/${props.id}/activities`, {
            query: { page: props.page ?? 1, per_page: props.per_page ?? 30 },
        });
    }

    /**
     * Returns a list of the administrators of a given club.
     */
    async getClubAdminsById(props: IGetClubAdminsById): Promise<entity.ISummaryAthlete[]> {
        return this.stravaApi.request("GET", `/clubs/${props.id}/admins`, {
            query: { page: props.page ?? 1, per_page: props.per_page ?? 30 },
        });
    }

    /**
     * Get Club (getClubById)
     * Returns a given club using its identifier.
     */
    async getClubById(props: IGetClubById): Promise<entity.IDetailedClub> {
        return this.stravaApi.request("GET", `/clubs/${props.id}`);
    }

    /**
     * Returns a list of the athletes who are members of a given club.
     */
    async getClubMembersById(props: IGetClubMembersById): Promise<entity.IClubAthlete[]> {
        return this.stravaApi.request("GET", `/clubs/${props.id}/members`, {
            query: { page: props.page ?? 1, per_page: props.per_page ?? 30 },
        });
    }
}
export default StravaClubApi;
