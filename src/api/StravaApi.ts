import * as entity from "./../entity/strava.entity";

interface IGetActivityById {
    id: number;
    include_all_efforts?: boolean;
}

interface IGetActivityComments {
    id: number;
    page_size?: number;
    after_cursor: string;
}

interface IGetKudoersByActivityId {
    id: number;
    page?: number;
    per_page?: number;
}

interface IGetLapsByActivityId {
    id: number;
}

interface IGetLoggedInAthleteActivities {
    before: number;//Integer, in query 	An epoch timestamp to use for filtering activities that have taken place before a certain time.
    after: number;//Integer, in query 	An epoch timestamp to use for filtering activities that have taken place after a certain time.
    page: number;//Integer, in query 	Page number. Defaults to 1.
    per_page: number;// Number of items per page. Defaults to 30. 
}

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

interface IGetZonesByActivityId {
    id: number;
}

interface IUpdateActivityById {
    id: number;
    body: entity.IUpdatableActivity
}

interface IUpdateLoggedInAthlete {
    weight: number;//required Float, in path 	The weight of the athlete in kilograms. 
}

interface IGetStats {
    id: number;
}

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

interface IGetLoggedInAthleteClubs {
    page?: number;//Integer, in query 	Page number. Defaults to 1.
    per_page?: number;//Integer, in query 	Number of items per page. Defaults to 30.  
}

interface IGetGearById {
    id: number;//required String, in path 	The identifier of the gear. 
}

interface IGetRouteAsGPX {
    id: number;//required Long, in path 	The iden
}

interface IGetRouteAsTCX {
    id: number;//required Long, in path 	The identifier of the route. 
}

interface IGetRouteById {
    id: number;//required Long, in path 	The ident
}

interface IGetRoutesByAthleteId {
    id: number;
    page: number;//Integer, in query 	Page number. Defaults to 1.
    per_page: number;// Integer, in query 	Number of i    
}

interface IGetEffortsBySegmentId {
    segment_id: number;//required Integer, in query 	The identifier of the segment.
    start_date_local: string;//Date, in query 	ISO 8601 formatted date time.
    end_date_local: string;//Date, in query 	ISO 8601 formatted date time.
    per_page: number;//Integer, in query 	Number of it
}

interface IGetSegmentEffortById {
    id: number;//id of the segment effort
}

interface IExploreSegments {
    bounds: number[];//required array[Float], in query 	The latitude and longitude for two points describing a rectangular boundary for the search: [southwest corner latitutde, southwest corner longitude, northeast corner latitude, northeast corner longitude]
    activity_type?: string;//String, in query 	Desired activity type. May take one of the following values: running, riding
    min_cat?: number;//Integer, in query 	The minimum climbing category.
    max_cat?: number;//Integer, in query 	 The maximum climbing category. 
}


interface IGetLoggedInAthleteStarredSegments {
    page: number;//Integer, in query 	Page number. Defaults to 1.
    per_page: number;//Integer, in query 	Number of items per page. Defaults to 30. 
}

interface IGetSegmentById {
    id: number; //id of the segment
}

interface IStarSegment {
    id: number;//required Long, in path 	The identifier of the segment to star.
    starred: boolean;//required Boolean, in form 	If true, star the segment; if false, unstar the segment. 
}

interface IGetActivityStreams {
    id: number; //required Long, in path 	The identifier of the activity.
    keys: string[]; //required array[String], in query 	Desired stream types. May take one of the following values:
    key_by_type: boolean;//required Boolean, in query 	Must be true. 
}

interface IGetRouteStreams {
    id: number;
}

interface IGetSegmentEffortStreams {
    id: number;//required Long, in path 	The identifier of the segment effort.
    keys: string[];//[]required array[String], in query 	The types of streams to return. May take one of the following values:
    key_by_type: boolean; //required Boolean, in query 	Must be true. 
}
interface IGetSegmentStreams {
    id: number;//required Long, in path 	The identifier of the segment.
    keys: string[];//required array[String], in query 	The types of streams to return. May take one of the following values:
    key_by_type: boolean; //required Boolean, in query 	Must be true. 
}

interface ICreateUpload {
    file: File;//File, in form 	The uploaded file.
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

class StravaApi {
    private accessToken: string;
    private baseUrl: string = "https://www.strava.com/api/v3";

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    async createActivity(props: ICreateActivity): Promise<entity.IDetailedActivity> {
        try {
            const response = await fetch(`${this.baseUrl}/activities`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "POST"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
* 
* Returns the given activity that is owned by the authenticated athlete. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
 * @param props 
 * @returns 
 */
    async getActivityById(props: IGetActivityById): Promise<entity.IDetailedActivity> {
        try {
            let url = `${this.baseUrl}/activities/${props.id}`;
            if (props.include_all_efforts) {
                url = `${url}?include_all_efforts`;
            }

            const response = await fetch(`${this.baseUrl}/activities/${props.id}`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }



    /**
     * 
     * List Activity Comments (getCommentsByActivityId)
     * Returns the comments on the given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     * @param props 
     * @returns 
     */
    async getCommentsByActivityId(props: IGetActivityComments): Promise<entity.IComment[]> {
        const { id, ...body } = props;

        try {
            let url = `${this.baseUrl}/activities/${props.id}/comments`;
            url = `${url}?page_size=${props.page_size ?? 30}&after_cursor=${props.after_cursor}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }

    /**
     * List Activity Kudoers (getKudoersByActivityId)
     * Returns the athletes who kudoed an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     * @param props 
     * @returns 
     */
    async getKudoersByActivityId(props: IGetKudoersByActivityId): Promise<entity.ISummaryAthlete[]> {
        const { id, ...body } = props;

        try {
            let url = `${this.baseUrl}/activities/${props.id}/kudos`;
            url = `${url}?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }

    /**
    * 
    * List Activity Laps (getLapsByActivityId)
    * Returns the laps of an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
    */
    async getLapsByActivityId(props: IGetLapsByActivityId): Promise<entity.ILap[]> {
        const { id, ...body } = props;

        try {
            const response = await fetch(`${this.baseUrl}/activities/${props.id}/laps`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }

    // http get "https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=" "Authorization: Bearer [[token]]"
    async getLoggedInAthleteActivities(props: IGetLoggedInAthleteActivities): Promise<entity.ISummaryActivity[]> {
        try {
            const url = `${this.baseUrl}/athlete/activities?before=${props.before}&after=${props.after}&page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }

    // http get "https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=" "Authorization: Bearer [[token]]"
    async getZonesByActivityId(props: IGetZonesByActivityId): Promise<entity.IActivityZone[]> {
        try {
            const url = `${this.baseUrl}/activities/${props.id}/zones`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }

    async updateActivityById(props: IUpdateActivityById): Promise<entity.IUpdatableActivity> {
        try {
            const url = `${this.baseUrl}/activities/${props.id}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                body: JSON.stringify(props.body),
                method: "PUT"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching gettin activities by id:', error);
            throw error;
        }
    }

    //--------------------------------------- ATHLETE
    /**
     * Get Authenticated Athlete (getLoggedInAthlete)
     * Returns the currently authenticated athlete. Tokens with profile:read_all scope will receive a detailed athlete representation; all others will receive a summary representation.
     * @returns 
     */
    async getLoggedInAthlete(): Promise<entity.IDetailedAthlete> {
        try {
            const response = await fetch(`${this.baseUrl}/athlete`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
    * Get Zones (getLoggedInAthleteZones)
     * @returns Returns the the authenticated athlete's heart rate and power zones. Requires profile:read_all.
     */
    async getLoggedInAthleteZones(): Promise<entity.IZone> {
        try {
            const response = await fetch(`${this.baseUrl}/athlete/zones`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
     * Get Athlete Stats (getStats)
     * Returns the activity stats of an athlete. Only includes data from activities set to Everyone visibilty.
     * @returns 
     */
    async getStats(props: IGetStats): Promise<entity.IActivitiesStats> {
        try {
            const response = await fetch(`${this.baseUrl}/athlete/${props.id}/stats`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
    * Update Athlete (updateLoggedInAthlete)
    * Update the currently authenticated athlete. Requires profile:write scope.
     * @param props 
     * @returns 
     */
    async updateLoggedInAthlete(props: IUpdateLoggedInAthlete): Promise<entity.IDetailedAthlete> {
        try {
            const response = await fetch(`${this.baseUrl}/athlete/`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                body: JSON.stringify(props),
                method: "PUT"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
     * 
    * 

$ http get "https://www.strava.com/api/v3/clubs/{id}/activities?page=&per_page=" "Authorization: Bearer [[token]]"


    */
    async getClubActivitiesById(props: IGetClubActivitiesById): Promise<entity.IClubActivity[]> {
        try {
            let url = `${this.baseUrl}/clubs/${props.id}/activities?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
            let url = `${this.baseUrl}/clubs/${props.id}/admins?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
            let url = `${this.baseUrl}/clubs/${props.id}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
            let url = `${this.baseUrl}/clubs/${props.id}/members?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
     * Returns a list of the clubs whose membership includes the authenticated athlete.
     */
    async getLoggedInAthleteClubs(props: IGetLoggedInAthleteClubs): Promise<entity.ISummaryClub[]> {
        try {
            let url = `${this.baseUrl}/athlete/clubs?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
     * gear
     */
    async getGearById(props: IGetGearById): Promise<entity.IDetailedGear> {
        try {
            let url = `${this.baseUrl}/gear/${props.id}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
    * Export Route GPX (getRouteAsGPX)
    * Returns a GPX file of the route. Requires read_all scope for private routes.
    * @return gpx file ??? 
    */
    async getRouteAsGPX(props: IGetRouteAsGPX): Promise<any> {
        try {
            let url = `${this.baseUrl}/routes/${props.id}/export_gpx`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
            let url = `${this.baseUrl}/routes/${props.id}/export_tsx`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
            let url = `${this.baseUrl}/routes/${props.id}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
     *  List Athlete Routes (getRoutesByAthleteId)
     * Returns a list of the routes created by the authenticated athlete. Private routes are filtered out unless requested by a token with read_all scope.
     */
    async getRoutesByAthleteId(props: IGetRoutesByAthleteId): Promise<entity.IRoute[]> {
        try {
            let url = `${this.baseUrl}/athletes/${props.id}/routes?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
    * List Segment Efforts (getEffortsBySegmentId)
    * Returns a set of the authenticated athlete's segment efforts for a given segment.
    * Requires subscription.
    */
    async getEffortsBySegmentId(props: IGetEffortsBySegmentId): Promise<entity.IDetailedSegmentEffort[]> {
        try {
            let url = `${this.baseUrl}/segment_efforts?segment_id=${props.segment_id}&start_date_local=${props.start_date_local}&end_date_local=${props.end_date_local}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
            let url = `${this.baseUrl}/segment_efforts/${props.id}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    // =========================== SEGMENT

    /**
     * Explore segments (exploreSegments)
    * Returns the top 10 segments matching a specified query.
     */
    async exploreSegments(props: IExploreSegments): Promise<entity.IExplorerResponse> {
        try {
            let url = `${this.baseUrl}/segments/explore?bounds=${JSON.stringify(props.bounds)}`;
            if (props.activity_type) url = `${url}&activity_type=${props.activity_type}`;
            if (props.min_cat) url = `${url}&min_cat=${props.min_cat}`;
            if (props.max_cat) url = `${url}&max_cat=${props.max_cat}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
     *  List Starred Segments (getLoggedInAthleteStarredSegments)
     * List of the authenticated athlete's starred segments. Private segments are filtered out unless requested by a token with read_all scope.
     */
    async getLoggedInAthleteStarredSegments(props: IGetLoggedInAthleteStarredSegments): Promise<entity.ISummarySegment[]> {
        try {
            let url = `${this.baseUrl}/segments/starred?page=${props.page ?? 1}&per_page=${props.per_page ?? 30}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
     * Get Segment (getSegmentById)
     * Returns the specified segment. read_all scope required in order to retrieve athlete-specific segment information, or to retrieve private segments.
     */
    async getSegmentById(props: IGetSegmentById): Promise<entity.IDetailedSegment> {
        try {
            let url = `${this.baseUrl}/segments/${props.id}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    /**
     * Star Segment (starSegment)
     * Stars/Unstars the given segment for the authenticated athlete. Requires profile:write scope.
     */
    async starSegment(props: IStarSegment): Promise<entity.IDetailedSegment> {
        try {
            let url = `${this.baseUrl}/segments/${props.id}/starred?`;
            let body = JSON.stringify({ starred: (props.starred) ? "true" : "false" });
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                body: body,
                method: "PUT"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }

    // ========================== stream
    /**
     * Get Activity Streams (getActivityStreams)
     * Returns the given activity's streams. Requires activity:read scope. Requires activity:read_all scope for Only Me activities.
     */
    async getActivityStreams(props: IGetActivityStreams): Promise<entity.IStreamSet> {
        try {
            let url = `${this.baseUrl}/activities/${props.id}/streams`;
            url = `${url}?key=${JSON.stringify(props.keys)}&key_by_type=${(props.key_by_type) ? "true" : "false"}`
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
            let url = `${this.baseUrl}/routes/${props.id}/streams`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
            let url = `${this.baseUrl}/segment_efforts/${props.id}/streams`;
            url = `${url}?key=${JSON.stringify(props.keys)}&key_by_type=${(props.key_by_type) ? "true" : "false"}`
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }
    /**
     * Get Segment Streams (getSegmentStreams)
     * Returns the given segment's streams. Requires read_all scope for private segments.
     */
    async getSegmentStreams(props: IGetSegmentStreams): Promise<entity.IStreamSet> {
        try {
            let url = `${this.baseUrl}/segments/${props.id}/streams`;
            url = `${url}?key=${JSON.stringify(props.keys)}&key_by_type=${(props.key_by_type) ? "true" : "false"}`

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }
    // =========================== uploads

    /**
     * Upload Activity (createUpload)
     * Uploads a new data file to create an activity from. Requires activity:write scope.
     */
    async createUpload(props: ICreateUpload): Promise<entity.IUpload> {
        try {
            let url = `${this.baseUrl}/uploads`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
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
            let url = `${this.baseUrl}/uploads/${props.uploadId}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method: "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }
}

export default StravaApi;