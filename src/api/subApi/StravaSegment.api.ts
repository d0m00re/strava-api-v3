import * as entity from "../../entity/strava.entity";
import StravaApi from "./../Strava.api";

interface IExploreSegments {
    bounds: string;//required array[Float], in query 	The latitude and longitude for two points describing a rectangular boundary for the search: [southwest corner latitutde, southwest corner longitude, northeast corner latitude, northeast corner longitude]
    activity_type?: string;//String, in query 	Desired activity type. May take one of the following values: running, riding
    min_cat?: number;//Integer, in query 	The minimum climbing category.
    max_cat?: number;//Integer, in query 	 The maximum climbing category.
}

interface IGetLoggedInAthleteStarredSegments {
    page ?: number;//Integer, in query 	Page number. Defaults to 1.
    per_page ?: number;//Integer, in query 	Number of items per page. Defaults to 30.
}

interface IGetSegmentById {
    id: number; //id of the segment
}

interface IStarSegment {
    id: number;//required Long, in path 	The identifier of the segment to star.
    starred: boolean;//required Boolean, in form 	If true, star the segment; if false, unstar the segment.
}

type TKeysSegmentStreams = "distance" | "latlng" | "altitude";
type IStreamSetSegment = Pick<entity.IStreamSet, "distance" | "latlng" | "altitude">

interface IGetSegmentStreams {
    id: string;//required Long, in path 	The identifier of the segment.
    keys: TKeysSegmentStreams[];//required array[String], in query 	The types of streams to return. May take one of the following values:
    key_by_type: boolean; //required Boolean, in query 	Must be true.
}

class StravaSegmentApi {
    stravaApi : StravaApi;
    constructor (stravaApi : StravaApi) {
        this.stravaApi = stravaApi;
    }

    /**
     * Explore segments (exploreSegments)
     * Returns the top 10 segments matching a specified query.
     */
    async exploreSegments(props: IExploreSegments): Promise<entity.IExplorerResponse> {
        return this.stravaApi.request("GET", "/segments/explore", { query: { ...props } });
    }

    /**
     * List Starred Segments (getLoggedInAthleteStarredSegments)
     * List of the authenticated athlete's starred segments. Private segments are filtered out unless requested by a token with read_all scope.
     */
    async getLoggedInAthleteStarredSegments(props ?: IGetLoggedInAthleteStarredSegments): Promise<entity.ISummarySegment[]> {
        return this.stravaApi.request("GET", "/segments/starred", {
            query: { page: props?.page ?? 1, per_page: props?.per_page ?? 30 }
        });
    }

    /**
     * Get Segment (getSegmentById)
     * Returns the specified segment. read_all scope required in order to retrieve athlete-specific segment information, or to retrieve private segments.
     */
    async getSegmentById(props: IGetSegmentById): Promise<entity.IDetailedSegment> {
        return this.stravaApi.request("GET", `/segments/${props.id}`);
    }

    /**
     * Star Segment (starSegment)
     * Stars/Unstars the given segment for the authenticated athlete. Requires profile:write scope.
     */
    async starSegment(props: IStarSegment): Promise<entity.IDetailedSegment> {
        return this.stravaApi.request("PUT", `/segments/${props.id}/starred`, { query: { starred: props.starred } });
    }

    /**
     * Get Segment Streams (getSegmentStreams)
     * Returns the given segment's streams. Requires read_all scope for private segments.
     */
    async getSegmentStreams(props: IGetSegmentStreams): Promise<IStreamSetSegment> {
        return this.stravaApi.request("GET", `/segments/${props.id}/streams`, {
            query: { keys: props.keys, key_by_type: props.key_by_type }
        });
    }
}
export default StravaSegmentApi;
