/**
 * A set of rolled-up statistics and totals for an athlete
 */
export interface IActivitiesStats {
    biggest_ride_distance ?: number;//double 	The longest distance ridden by the athlete.
    biggest_climb_elevation_gain ?: number; //double 	The highest climb ridden by the athlete.
    recent_ride_totals ?: IActivityTotal; //ActivityTotal 	The recent (last 4 weeks) ride stats for the athlete.
    recent_run_totals ?: IActivityTotal; //ActivityTotal 	The recent (last 4 weeks) run stats for the athlete.
    recent_swim_totals ?: IActivityTotal; //ActivityTotal 	The recent (last 4 weeks) swim stats for the athlete.
    ytd_ride_totals ?: IActivityTotal; //ActivityTotal 	The year to date ride stats for the athlete.
    ytd_run_totals ?: IActivityTotal; //ActivityTotal 	The year to date run stats for the athlete.
    ytd_swim_totals ?: IActivityTotal; //ActivityTotal 	The year to date swim stats for the athlete.
    all_ride_totals ?: IActivityTotal; //ActivityTotal 	The all time ride stats for the athlete.
    all_run_totals ?: IActivityTotal; //ActivityTotal 	The all time run stats for the athlete.
    all_swim_totals ?: IActivityTotal; //ActivityTotal 	The all time swim stats for the athlet
}

/**
 * A roll-up of metrics pertaining to a set of activities. Values are in seconds and meters.
 */
export interface IActivityTotal {
    count: number; //integer 	The number of activities considered in this total.
    distance: number;// float 	The total distance covered by the considered activities.
    moving_time: number;//integer 	The total moving time of the considered activities.
    elapsed_time: number; //integer 	The total elapsed time of the considered activities.
    elevation_gain: number; // float 	The total elevation gain of the considered activities.
    achievement_count ?: number; //integer 	The total number of achievements of the considered activities. 
}

/**
 * An enumeration of the types an activity may have. Note that this enumeration does not include new sport types (e.g. MountainBikeRide, EMountainBikeRide), activities with these sport types will have the corresponding activity type (e.g. Ride for MountainBikeRide, EBikeRide for EMountainBikeRide)
 * https://developers.strava.com/docs/reference/#api-models-ActivityType
 */
export type TActivityType = 'AlpineSki' | 'BackcountrySki' | 'Canoeing' | 'Crossfit' | 'EBikeRide' | 'Elliptical' | 'Golf' | 'Handcycle' | 'Hike' | 'IceSkate' | 'InlineSkate' | 'Kayaking' | 'Kitesurf' | 'NordicSki' | 'Ride' | 'RockClimbing' | 'RollerSki' | 'Rowing' | 'Run' | 'Sail' | 'Skateboard' | 'Snowboard' | 'Snowshoe' | 'Soccer' | 'StairStepper' | 'StandUpPaddling' | 'Surfing' | 'Swim' | 'Velomobile' | 'VirtualRide' | 'VirtualRun' | 'Walk' | 'WeightTraining' | 'Wheelchair' | 'Windsurf' | 'Workout' | 'Yoga';

export interface IStreamSet {
    time: ITimeStream;//TimeStream 	An instance of TimeStream.
    distance: IDistanceStream;//DistanceStream 	An instance of DistanceStream.
    latlng: ILatLngStream; //LatLngStream 	An instance of LatLngStream.
    altitude: IAltitudeStream; //AltitudeStream 	An instance of AltitudeStream.
    velocity_smooth: ISmoothVelocityStream; //SmoothVelocityStream 	An instance of SmoothVelocityStream.
    heartrate: IHeartrateStream;  //HeartrateStream 	An instance of HeartrateStream.
    cadence: ICadenceStream; //CadenceStream 	An instance of CadenceStream.
    watts: IPowerStream; //PowerStream 	An instance of PowerStream.
    temp: ITemperatureStream; //TemperatureStream 	An instance of TemperatureStream.
    moving: IMovingStream; //MovingStream 	An instance of MovingStream.
    grade_smooth: ISmoothGradeStream; //SmoothGradeStream 	An instance of SmoothGradeStream. 
}

export interface ISummaryGear {
    id: string;//string 	The gear's unique identifier.
    resource_state: number;//integer 	Resource state, indicates level of detail. Possible values: 2 -> "summary", 3 -> "detail"
    primary: boolean;//boolean 	Whether this gear's is the owner's default one.
    name: string;//string 	The gear's name.
    distance: number; //float 	 The distance logged with this gear. 
}

export interface ISummaryPRSegmentEffort {
    pr_activity_id: number;//long 	The unique identifier of the activity related to the PR effort.
    pr_elapsed_time: number;//integer 	The elapsed time ot the PR effort.
    pr_date: string; //DateTime 	The time at which the PR effort was started.
    effort_count: number;//integer 	Number of efforts by the authenticated athlete on this segment. 
}



// todo : check itinstance of???
/**
 * ...
 */
export interface IActivityZone {
    score: number; //integer 	An instance of integer.
    distribution_buckets: string;//#/TimedZoneDistribution 	An instance of #/TimedZoneDistribution.
    type: string;//string 	May take one of the following values: heartrate, power
    sensor_based: boolean; //boolean 	An instance of boolean.
    points: number;//integer 	An instance of integer.
    custom_zones: boolean; //boolean 	An instance of boolean.
    max: number;//integer 	An instance of integer. 
}

export interface IBaseStream {
    original_size: number; //integer 	The number of data points in this stream
    resolution: string;//string 	The level of detail (sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string; //string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
}

export interface IClubActivity {
    resource_state : number;
    athlete: IMetaAthlete;//MetaAthlete 	An instance of MetaAthlete.
    name: string;//string 	The name of the activity
    distance: number;//float 	The activity's distance, in meters
    moving_time: number;//integer 	The activity's moving time, in seconds
    elapsed_time: number;//integer 	The activity's elapsed time, in seconds
    total_elevation_gain: number;//float 	The activity's total elevation gain.
    type: TActivityType; //ActivityType 	Deprecated. Prefer to use sport_type
    sport_type: TSportType; //SportType 	An instance of SportType.
    workout_type ?: number | null; //integer  The activity's workout type  	| doc bad type
}

export interface IClubAthlete {
    resource_state: 1 | 2 | 3; //integer 	Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail"
    firstname: string;//string 	The athlete's first name.
    lastname: string;//string 	The athlete's last initial.
    //member ?: string;//string 	The athlete's member status.
    admin: boolean;//boolean 	Whether the athlete is a club admin.
    owner: boolean;//boolean 	Whether the athlete is club owner. 
    membership : 'member' | 'admin';
}

export interface IClubComment {
    id: number;//long 	The unique identifier of this comment
    activity_id: number;//long 	The identifier of the activity this comment is related to
    text: string; //string 	The content of the comment
    athlete: ISummaryAthlete; //SummaryAthlete 	An instance of SummaryAthlete.
    created_at: string; // The time at which this comment was created. 
}

export interface IError {
    code: string;//string 	The code associated with this error.
    field: string; //string 	The specific field or aspect of the resource associated with this error.
    resource: string; //string 	The type of resource associated with this error. 
}

export interface ExplorerSegment {
    id: number;//long 	The unique identifier of this segment
    name: string;//string 	The name of this segment
    climb_category: "NG" | 0 | 1 | 2 | 3 | 4 | 5 | "LG"; //integer 	The category of the climb [0, 5]. Higher is harder ie. 5 is Hors catégorie, 0 is uncategorized in climb_category. If climb_category = 5, climb_category_desc = HC. If climb_category = 2, climb_category_desc = 3.
    climb_category_desc: string; //string 	The description for the category of the climb May take one of the following values: NC, 4, 3, 2, 1, HC
    avg_grade: number;// float 	The segment's average grade, in percents
    start_latlng: TLatLng; //LatLng 	An instance of LatLng.
    end_latlng: TLatLng; //LatLng 	An instance of LatLng.
    elev_difference: number;// float; 	The segments's evelation difference, in meters
    distance: number;//float 	The segment's distance, in meters
    points: string; //string 	 The polyline of the segment 
}

/**
 * Encapsulates the errors that may be returned from the API.
 */
export interface IFault {
    errors: IError;//Error 	The set of specific errors associated with this fault, if any.
    message: string; //string 	 The message of the fault.
}

export interface IHeartRateZoneRanges {
    custom_zones: boolean;//boolean 	Whether the athlete has set their own custom heart rate zones
    zones: IZoneRanges;// An instance of ZoneRanges. 
}

/**
 * 
 */
export interface ILap {
    id: number;//long 	The unique identifier of this lap
    resource_state ?: number; // np
    device_watts ?: boolean; // np
    average_watts ?: number; // np
    average_heartrate ?: number;// np
    max_heartrate ?: number; // np
    activity: IMetaActivity; //MetaActivity 	An instance of MetaActivity.
    athlete: IMetaAthlete; //MetaAthlete 	An instance of MetaAthlete.
    average_cadence: number;//float 	The lap's average cadence
    average_speed: number;//float 	The lap's average speed
    distance: number;//float 	The lap's distance, in meters
    elapsed_time: number;//integer 	The lap's elapsed time, in seconds
    start_index: number;//integer 	The start index of this effort in its activity's stream
    end_index: number;//integer 	The end index of this effort in its activity's stream
    lap_index: number;//integer 	The index of this lap in the activity it belongs to
    max_speed: number;//float 	The maximum speed of this lat, in meters per second
    moving_time: number;//integer 	The lap's moving time, in seconds
    name: string;//string 	The name of the lap
    pace_zone: number;//integer 	The athlete's pace zone during this lap
    split: number;//integer 	An instance of integer.
    start_date: string;//DateTime 	The time at which the lap was started.
    start_date_local: string; //DateTime 	The time at which the lap was started in the local timezone.
    total_elevation_gain: number;//float 	 The elevation gain of this lap, in meters 
}

/**
 * A collection of float objects. A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers.
 */
export type TLatLng = [latitude: number, longitude: number];


export interface IMetaActivity {
    id: number;//long 	The unique identifier of the activity
    visibility ?: string | 'everyone';
    resource_state ?: number;
}

export interface IMetaAthlete {
    id ?: number; //long The unique identifier of the athlete 
    resource_state ?: number; // not in doc
    firstname ?: string; // not in doc
    lastname ?: string; // not in doc
}

export interface IMetaClub {
    id: number;//long 	The club's unique identifier.
    resource_state: number;//integer 	Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail"
    name: string;//string 	The club's name. 
}

// todo : check set of segments
export interface IExplorerResponse {
    segments: IExplorerSegment;// //ExplorerSegment 	The set of segments matching an explorer request 
}

export interface IExplorerSegment {
    id: number;//long 	The unique identifier of this segment
    name: string;//string 	The name of this segment
    climb_category: number;//integer 	The category of the climb [0, 5]. Higher is harder ie. 5 is Hors catégorie, 0 is uncategorized in climb_category. If climb_category = 5, climb_category_desc = HC. If climb_category = 2, climb_category_desc = 3.
    climb_category_desc: string;//string 	The description for the category of the climb May take one of the following values: NC, 4, 3, 2, 1, HC
    avg_grade: number;//float 	The segment's average grade, in percents
    start_latlng: TLatLng; //LatLng 	An instance of LatLng.
    end_latlng: TLatLng;//LatLng 	An instance of LatLng.
    elev_difference: number;//float 	The segments's evelation difference, in meters
    distance: number;//float 	The segment's distance, in meters
    points: string; //string 	The polyline of the segment 
}

export interface IPhotosSummary {
    count: number; //integer 	The number of photos
    primary: IPhotosSummaryPrimary; //PhotosSummary_primary 	An instance of PhotosSummary_primary. 
}

export interface IPhotosSummaryPrimary {
    id: number;//long 	An instance of long.
    source: number; //integer 	An instance of integer.
    unique_id: string; //string 	An instance of string.
    urls: string;//string 	An instance of string. 
}

// why string for id this time? probably not the same db
export interface IPolylineMap {
    id: string;//string 	The identifier of the map
    polyline: string; // string 	The polyline of the map, only returned on detailed representation of an object
    summary_polyline ?: string; // string The summary polyline of the map  	
    resource_state ?: number;
}

export interface IPowerZoneRanges {
    zones: IZoneRanges; //ZoneRanges 	An instance of ZoneRanges. 
}

export interface IRoute {
    athlete: ISummaryAthlete; //SummaryAthlete 	An instance of SummaryAthlete.
    description: string;//string 	The description of the route
    distance: number;//float 	The route's distance, in meters
    elevation_gain: number; //float 	The route's elevation gain.
    id: number;//long 	The unique identifier of this route
    id_str: string;//string 	The unique identifier of the route in string format
    map: IPolylineMap; //PolylineMap 	An instance of PolylineMap.
    name: string; //string 	The name of this route
    private: boolean; //boolean 	Whether this route is private
    starred: boolean;//boolean 	Whether this route is starred by the logged-in athlete
    timestamp: number;//integer 	An epoch timestamp of when the route was created
    type: number;//integer 	This route's type (1 for ride, 2 for runs)
    sub_type: number;//integer 	This route's sub-type (1 for road, 2 for mountain bike, 3 for cross, 4 for trail, 5 for mixed)
    created_at: string;//DateTime 	The time at which the route was created
    updated_at: string; //DateTime 	The time at which the route was last updated
    estimated_moving_time: number; //integer 	Estimated time in seconds for the authenticated athlete to complete route
    segments: ISummarySegment; //SummarySegment 	The segments traversed by this route
    waypoints: IWaypoint;//Waypoint 	The custom waypoints along this route 
}

export interface ISplit {
    average_speed: number;//float 	The average speed of this split, in meters per second
    distance: number;//float 	The distance of this split, in meters
    elapsed_time: number;//integer 	The elapsed time of this split, in seconds
    elevation_difference: number; //float 	The elevation difference of this split, in meters
    pace_zone: number;//integer 	The pacing zone of this split
    moving_time: number;//integer 	The moving time of this split, in seconds
    split: number; //integer 	N/A
}

type TSportType = 'AlpineSki' | 'BackcountrySki' | 'Badminton' | 'Canoeing' | 'Crossfit' | 'EBikeRide' | 'Elliptical' | 'EMountainBikeRide' | 'Golf' | 'GravelRide' | 'Handcycle' | 'HighIntensityIntervalTraining' | 'Hike' | 'IceSkate' | 'InlineSkate' | 'Kayaking' | 'Kitesurf' | 'MountainBikeRide' | 'NordicSki' | 'Pickleball' | 'Pilates' | 'Racquetball' | 'Ride' | 'RockClimbing' | 'RollerSki' | 'Rowing' | 'Run' | 'Sail' | 'Skateboard' | 'Snowboard' | 'Snowshoe' | 'Soccer' | 'Squash' | 'StairStepper' | 'StandUpPaddling' | 'Surfing' | 'Swim' | 'TableTennis' | 'Tennis' | 'TrailRun' | 'Velomobile' | 'VirtualRide' | 'VirtualRow' | 'VirtualRun' | 'Walk' | 'WeightTraining' | 'Wheelchair' | 'Windsurf' | 'Workout' | 'Yoga';

export interface ISummarySegment {
    id: number;//long 	The unique identifier of this segment
    resource_state ?: number; // np
    elevation_profile ?: null | any; // np
    hazardous ?: boolean; // np
    starred ?: boolean; // np
    name: string;//string 	The name of this segment
    activity_type ?: string; //string 	May take one of the following values: Ride, Run
    distance ?: number;//float 	The segment's distance, in meters
    average_grade ?: number;//float 	The segment's average grade, in percents
    maximum_grade ?: number; //float 	The segments's maximum grade, in percents
    elevation_high ?: number;//float 	The segments's highest elevation, in meters
    elevation_low ?: number; //float 	The segments's lowest elevation, in meters
    start_latlng ?: TLatLng; //LatLng 	An instance of LatLng.
    end_latlng ?: TLatLng; //LatLng 	An instance of LatLng.
    climb_category ?: number;// integer 	The category of the climb [0, 5]. Higher is harder ie. 5 is Hors catégorie, 0 is uncategorized in climb_category.
    city ?: string;//string 	The segments's city.
    state ?: string;//string 	The segments's state or geographical region.
    country ?: string;//string 	The segment's country.
    private ?: boolean;//boolean 	Whether this segment is private.
    athlete_pr_effort ?: ISummaryPRSegmentEffort; // SummaryPRSegmentEffort 	An instance of SummaryPRSegmentEffort.
    athlete_segment_stats ?: ISummarySegmentEffort; //SummarySegmentEffort 	An instance of SummarySegmentEffort. 
}

export interface ISummarySegmentEffort {
    id ?: number;//long 	The unique identifier of this effort
    activity_id ?: number;//long 	The unique identifier of the activity related to this effort
    elapsed_time ?: number;//integer 	The effort's elapsed time
    start_date ?: string; //DateTime 	The time at which the effort was started.
    start_date_local ?: string; //DateTime 	The time at which the effort was started in the local timezone.
    distance ?: number;//float 	The effort's distance in meters
    is_kom ?: boolean; //boolean 	 Whether this effort is the current best on the leaderboard 

    pr_elapsed_time ?: number;
    pr_date ?: string;
    pr_visibility ?: string;
    pr_activity_id ?: number;
    pr_activity_visibility ?: string;
    effort_count ?: number;
}

//A collection of #/TimedZoneRange objects. Stores the exclusive ranges representing zones and the time spent in each.
type TTimedZoneDistribution = ITimedZoneRange[];

export interface IUpdatableActivity {
    commute: boolean;//boolean 	Whether this activity is a commute
    trainer: boolean;//boolean 	Whether this activity was recorded on a training machine
    hide_from_home: boolean;//boolean 	Whether this activity is muted
    description: string; //string 	The description of the activity
    name: string;//string 	The name of the activity
    type: TActivityType; //ActivityType 	Deprecated.Prefer to use sport_type.In a request where both type and sport_type are present, this field will be ignored
    sport_type: TSportType; //SportType 	An instance of SportType.
    gear_id: string; //string 	Identifier for the gear associated with the activity. ‘none’ clears gear from activity 
}

export interface IUpload {
    id: number;//long 	The unique identifier of the upload
    id_str: string;//string 	The unique identifier of the upload in string format
    external_id: string;//string 	The external identifier of the upload
    error: string;//string 	The error associated with this upload
    status: string;//string 	The status of this upload
    activity_id: number;//long 	The identifier of the activity this upload resulted into 
}

export interface IWaypoint {
    latlng: TLatLng; //LatLng 	The location along the route that the waypoint is closest to
    target_latlng: TLatLng; //LatLng 	A location off of the route that the waypoint is (optional)
    categories: string; // 	Categories that the waypoint belongs to
    title: string; //string 	A title for the waypoint
    description: string;//string 	A description of the waypoint (optional)
    distance_into_route: number; //integer 	The number meters along the route that the waypoint is located 
}

export interface IZoneRange {
    min: number;// integer 	The minimum value in the range.
    max: number; //integer 	The maximum value in the range. 
}

export type IZoneRanges = IZoneRange[];

export interface IZone {
    heart_rate: IHeartRateZoneRanges;//HeartRateZoneRanges 	An instance of HeartRateZoneRanges.
    power ?: IPowerZoneRanges;//PowerZoneRanges 	An insta
}

export interface IAltitudeStream {
    original_size: number; //integer 	The number of data points in this stream
    resolution: string;//string 	The level of detail (sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string; //string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: number;//float 	 The sequence of altitude values for this stream, in meters 
}

export interface ICadenceStream {
    original_size: number;//integer 	The number of data points in this stream
    resolution: string; //string 	The level of detail(sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string;//string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: number;//integer 	The sequence of cadence values for this stream, in rotations per minute 
}

export interface IDetailedGear {
    id: string; //string 	The gear's unique identifier.
    resource_state: number;//integer 	Resource state, indicates level of detail. Possible values: 2 -> "summary", 3 -> "detail"
    primary: boolean;//boolean 	Whether this gear's is the owner's default one.
    name: string;//string 	The gear's name.
    distance: number;//float 	The distance logged with this gear.
    brand_name: string; //string 	The gear's brand name.
    model_name: string; //string 	The gear's model name.
    frame_type: number;//integer 	The gear's frame type (bike only).
    description: string; //string 	The gear's description. 
}

export interface IDetailedSegment {
    id: number;//long 	The unique identifier of this segment
    resource_state ?: number; // nd
    elevation_profile ?: string; // nd
    starred ?: boolean; // nd
    name: string;//string 	The name of this segment
    activity_type: string;//string 	May take one of the following values: Ride, Run
    distance: number;//float 	The segment's distance, in meters
    average_grade: number;//float 	The segment's average grade, in percents
    maximum_grade: number;//float 	The segments's maximum grade, in percents
    elevation_high: number;//float 	The segments's highest elevation, in meters
    elevation_low: number;//float 	The segments's lowest elevation, in meters
    start_latlng: TLatLng;// LatLng 	An instance of LatLng.
    end_latlng: TLatLng; //LatLng 	An instance of LatLng.
    climb_category: number;// integer 	The category of the climb [0, 5]. Higher is harder ie. 5 is Hors catégorie, 0 is uncategorized in climb_category.
    city: string; //string 	The segments's city.
    state: string; //string 	The segments's state or geographical region.
    country: string; //string 	The segment's country.
    private: boolean; //boolean 	Whether this segment is private.
    athlete_pr_effort ?: ISummaryPRSegmentEffort; //SummaryPRSegmentEffort 	An instance of SummaryPRSegmentEffort.
    athlete_segment_stats: ISummarySegmentEffort; //SummarySegmentEffort 	An instance of SummarySegmentEffort.
    created_at: string; //DateTime 	The time at which the segment was created.
    updated_at: string; //DateTime 	The time at which the segment was last updated.
    total_elevation_gain: number;//float 	The segment's total elevation gain.
    map: IPolylineMap; //PolylineMap 	An instance of PolylineMap.
    effort_count: number; //integer 	The total number of efforts for this segment
    athlete_count: number; //integer 	The number of unique athletes who have an effort for this segment
    hazardous: boolean;//boolean 	Whether this segment is considered hazardous
    star_count: number; //integer 	The number of stars for this segment 

    xoms ?: {
        kom ?: string;
        qom ?: string;
        overall ?: string;
        destination ?: {
            href ?: string;
            type ?: string;
            name ?: string;
        }
    },

    local_legend ?: {
        athlete_id ?: number;
        title?: string;
        profile?: string;
        effort_description?: string,
        effort_count?: string,
        effort_counts?: { overall ?: string, female ?: string },
        destination?: string;
    }
}

export interface IDetailedSegmentEffort {
    id: number; //long 	The unique identifier of this effort
    resource_state ?: number;
    activity_id ?: number;//long 	The unique identifier of the activity related to this effort
    elapsed_time ?: number;//integer 	The effort's elapsed time
    start_date ?: string; //DateTime 	The time at which the effort was started.
    start_date_local ?: string;//DateTime 	The time at which the effort was started in the local timezone.
    distance ?: number;//float 	The effort's distance in meters
    is_kom ?: boolean;//boolean 	Whether this effort is the current best on the leaderboard
    name ?: string; //string 	The name of the segment on which this effort was performed
    activity ?: IMetaActivity;//MetaActivity 	An instance of MetaActivity.
    athlete ?: IMetaAthlete; //MetaAthlete 	An instance of MetaAthlete.
    moving_time ?: number;//integer 	The effort's moving time
    start_index ?: number;//integer 	The start index of this effort in its activity's stream
    end_index ?: number;//integer 	The end index of this effort in its activity's stream
    average_cadence ?: number;//float 	The effort's average cadence
    average_watts ?: number;//float 	The average wattage of this effort
    device_watts ?: boolean;//boolean 	For riding efforts, whether the wattage was reported by a dedicated recording device
    average_heartrate ?: number;//float 	The heart heart rate of the athlete during this effort
    max_heartrate ?: number;//float 	The maximum heart rate of the athlete during this effort
    segment ?: ISummarySegment; //SummarySegment 	An instance of SummarySegment.
    kom_rank ?: number | null;//integer 	The rank of the effort on the global leaderboard if it belongs in the top 10 at the time of upload
    pr_rank ?: number;//integer 	The rank of the effort on the athlete's leaderboard if it belongs in the top 3 at the time of upload
    hidden ?: boolean;//boolean 	Whether this effort should be hidden when viewed within an activity 
    achievements ?: any;
    visibility ?: any;
}

export interface IDistanceStream {
    original_size: number;//integer 	The number of data points in this stream
    resolution: string;//string 	The level of detail (sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string;  //string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: number;//float 	The sequence of distance values for this stream, in meters 
}

export interface IHeartrateStream {
    original_size: number;//integer 	The number of data points in this stream
    resolution: string;//string 	The level of detail (sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string;//string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: number;//integer 	The sequence of heart rate values for this stream, in beats per minute 
}

export interface ILatLngStream {
    original_size: number;//integer 	The number of data points in this stream
    resolution: string; //string 	The level of detail (sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string; //string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: TLatLng; //LatLng 	The sequence of lat/long values for this stream 
}

export interface IMovingStream {
    original_size: number;//integer 	The number of data points in this stream
    resolution: string; //string 	The level of detail (sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string; //string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: boolean;//boolean 	The sequence of moving values for this stream, as boolean values 
}

export interface IPowerStream {
    original_size: number;//integer 	The number of data points in this stream
    resolution: string;//string 	The level of detail(sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string;//string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: number;//integer 	The sequence of power values for this stream, in watts 
}

export interface ISmoothGradeStream {
    original_size: number; //integer 	The number of data points in this stream
    resolution: string; //string 	The level of detail(sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string; //string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: number;//float 	The sequence of grade values for this stream, as percents of a grade
}

export interface ISmoothVelocityStream {
    original_size: number;//integer 	The number of data points in this stream
    resolution: string;//string 	The level of detail (sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string;//string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: number;//float 	The sequence of velocity values for this stream, in meters per second 
}

export interface ISummaryActivity {
    id: number;//long 	The unique identifier of the activity
    external_id: string;//string 	The identifier provided at upload time
    upload_id: number;//long 	The identifier of the upload that resulted in this activity
    athlete: IMetaAthlete; //MetaAthlete 	An instance of MetaAthlete.
    name: string; //string 	The name of the activity
    distance: number; //float 	The activity's distance, in meters
    moving_time: number;//integer 	The activity's moving time, in seconds
    elapsed_time: number;//integer 	The activity's elapsed time, in seconds
    total_elevation_gain: number;//float 	The activity's total elevation gain.
    elev_high: number;//float 	The activity's highest elevation, in meters
    elev_low: number; //float 	The activity's lowest elevation, in meters
    type: TActivityType;// ActivityType 	Deprecated. Prefer to use sport_type
    sport_type: TSportType;// SportType 	An instance of SportType.
    start_date: string;//DateTime 	The time at which the activity was started.
    start_date_local: string;//DateTime 	The time at which the activity was started in the local timezone.
    timezone: string; //string 	The timezone of the activity
    start_latlng: TLatLng;// LatLng 	An instance of LatLng.
    end_latlng: TLatLng;//LatLng 	An instance of LatLng.
    achievement_count: number; //integer 	The number of achievements gained during this activity
    kudos_count: number;//integer 	The number of kudos given for this activity
    comment_count: number; //integer 	The number of comments for this activity
    athlete_count: number; //integer 	The number of athletes for taking part in a group activity
    photo_count: number;//integer 	The number of Instagram photos for this activity
    total_photo_count: number;//integer 	The number of Instagram and Strava photos for this activity
    map: IPolylineMap; //PolylineMap 	An instance of PolylineMap.
    trainer: boolean;//boolean 	Whether this activity was recorded on a training machine
    commute: boolean;//boolean 	Whether this activity is a commute
    manual: boolean;//boolean 	Whether this activity was created manually
    private: boolean;//boolean 	Whether this activity is private
    flagged: boolean;//boolean 	Whether this activity is flagged
    workout_type: number;//integer 	The activity's workout type
    upload_id_str: string; //string 	The unique identifier of the upload in string format
    average_speed: number; //float 	The activity's average speed, in meters per second
    max_speed: number; //float 	The activity's max speed, in meters per second
    has_kudoed: boolean;//boolean 	Whether the logged-in athlete has kudoed this activity
    hide_from_home: boolean;//boolean 	Whether the activity is muted
    gear_id: string; //string 	The id of the gear for the activity
    kilojoules: number; //float 	The total work done in kilojoules during this activity. Rides only
    average_watts: number; //float 	Average power output in watts during this activity. Rides only
    device_watts: boolean; //boolean 	Whether the watts are from a power meter, false if estimated
    max_watts: number;//integer 	Rides with power meter data only
    weighted_average_watts: number; //integer 	Similar to Normalized Power. Rides with power meter data only 
}

export interface ISummaryAthlete {
    id ?: number;//long 	The unique identifier of the athlete
    resource_state: number;//integer 	Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail"
    firstname: string;//string 	The athlete's first name.
    lastname: string; //string 	The athlete's last name.
    profile_medium ?: string;//string 	URL to a 62x62 pixel profile picture.
    profile ?: string; //string 	URL to a 124x124 pixel profile picture.
    city ?: string;//string 	The athlete's city.
    state ?: string; //string 	The athlete's state or geographical region.
    country ?: string;//string 	The athlete's country.
    sex ?: "M" | "F"; //string 	The athlete's sex. May take one of the following values: M, F
    premium ?: boolean;//boolean 	Deprecated. Use summit field instead. Whether the athlete has any Summit subscription.
    summit ?: boolean;//boolean 	Whether the athlete has any Summit subscription.
    created_at ?: string; //DateTime 	The time at which the athlete was created.
    updated_at ?: string; //DateTime 	The time at which the athlete was last updated. 
}

export interface ISummaryClub {
    id: number;//long 	The club's unique identifier.
    profile : string; // not in
    resource_state: number;//integer 	Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail"
    name: string;//string 	The club's name.
    profile_medium: string; //string 	URL to a 60x60 pixel profile picture.
    cover_photo: string | null;//string | null ni 	URL to a ~1185x580 pixel cover photo.
    cover_photo_small: string | null;//string | null ni 	URL to a ~360x176 pixel cover photo.
    sport_type?: string;//string 	Deprecated. Prefer to use activity_types. May take one of the following values: cycling, running, triathlon, other
    activity_types: TActivityType[];// ActivityType 	The activity types that count for a club. This takes precedence over sport_type.
    activity_types_icon : string; // not in
    dimensions :string[]; // not in
    localized_sport_type : string | "Multysport"; // not in
    city: string;//string 	The club's city.
    state: string;//string 	The club's state or geographical region.
    country: string; //string 	The club's country.
    private: boolean;//boolean 	Whether the club is private.
    member_count: number;//integer 	The club's member count.
    featured: boolean;//boolean 	Whether the club is featured or not.
    verified: boolean;//boolean 	Whether the club is verified or not.
    url: string;//string 	The club's vanity URL. 
}

// data????
export interface ITemperatureStream {
    original_size: number;//integer 	The number of data points in this stream
    resolution: string;//string 	The level of detail (sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string;//string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: number;//integer 	The sequence of temperature values for this stream, in celsius degrees 
}

// data ?????
export interface ITimeStream {
    original_size: number;//integer 	The number of data points in this stream
    resolution: string; //string 	The level of detail (sampling) in which this stream was returned May take one of the following values: low, medium, high
    series_type: string;//string 	The base series used in the case the stream was downsampled May take one of the following values: distance, time
    data: number;//integer 	The sequence of time values for this stream, in seconds 
}

/**
 * A union type representing the time spent in a given zone.
 */
export interface ITimedZoneRange {
    min: number;//integer 	The minimum value in the range.
    max: number;//integer 	The maximum value in the range.
    time: number;//integer 	The number of seconds spent in this zone 
}

export interface IDetailedActivity {
    id: number;//long 	The unique identifier of the activity
    external_id: string;//string 	The identifier provided at upload time
    upload_id: number;//long 	The identifier of the upload that resulted in this activity
    athlete: IMetaAthlete;//MetaAthlete 	An instance of MetaAthlete.
    name: string;//string 	The name of the activity
    distance: number;//float 	The activity's distance, in meters
    moving_time: number;//integer 	The activity's moving time, in seconds
    elapsed_time: number;//integer 	The activity's elapsed time, in seconds
    total_elevation_gain: number;//float 	The activity's total elevation gain.
    elev_high: number;//float 	The activity's highest elevation, in meters
    elev_low: number;//float 	The activity's lowest elevation, in meters
    type?: TActivityType;// ActivityType 	Deprecated. Prefer to use sport_type
    sport_type: TSportType;// SportType 	An instance of SportType.
    start_date: string; //DateTime 	The time at which the activity was started.
    start_date_local: string;//DateTime 	The time at which the activity was started in the local timezone.
    timezone: string; //string 	The timezone of the activity
    start_latlng: TLatLng; //LatLng 	An instance of LatLng.
    end_latlng: TLatLng;// LatLng 	An instance of LatLng.
    achievement_count: number;//integer 	The number of achievements gained during this activity
    kudos_count: number;//integer 	The number of kudos given for this activity
    comment_count: number;//integer 	The number of comments for this activity
    athlete_count: number;//integer 	The number of athletes for taking part in a group activity
    photo_count: number;//integer 	The number of Instagram photos for this activity
    total_photo_count: number;//integer 	The number of Instagram and Strava photos for this activity
    map: IPolylineMap; //PolylineMap 	An instance of PolylineMap.
    trainer: boolean;// boolean 	Whether this activity was recorded on a training machine
    commute: boolean;//boolean 	Whether this activity is a commute
    manual: boolean; //boolean 	Whether this activity was created manually
    private: boolean;//boolean 	Whether this activity is private
    flagged: boolean;//boolean 	Whether this activity is flagged
    workout_type: number;//integer 	The activity's workout type
    upload_id_str: string; //string 	The unique identifier of the upload in string format
    average_speed: number;//float 	The activity's average speed, in meters per second
    max_speed: number;//float 	The activity's max speed, in meters per second
    has_kudoed: boolean;//boolean 	Whether the logged-in athlete has kudoed this activity
    hide_from_home: boolean;//boolean 	Whether the activity is muted
    gear_id: string; //string 	The id of the gear for the activity
    kilojoules: number;//float 	The total work done in kilojoules during this activity. Rides only
    average_watts: number;//float 	Average power output in watts during this activity. Rides only
    device_watts: boolean; //boolean 	Whether the watts are from a power meter, false if estimated
    max_watts: number;//integer 	Rides with power meter data only
    weighted_average_watts: number;//integer 	Similar to Normalized Power. Rides with power meter data only
    description: string;//string 	The description of the activity
    photos: IPhotosSummary; //PhotosSummary 	An instance of PhotosSummary.
    gear: ISummaryGear; //SummaryGear 	An instance of SummaryGear.
    calories: number;//float 	The number of kilocalories consumed during this activity
    segment_efforts: IDetailedSegmentEffort; //DetailedSegmentEffort 	A collection of DetailedSegmentEffort objects.
    device_name: string;//string 	The name of the device used to record the activity
    embed_token: string;//string 	The token used to embed a Strava activity
    splits_metric: ISplit; //Split 	The splits of this activity in metric units (for runs)
    splits_standard: ISplit;// Split 	The splits of this activity in imperial units (for runs)
    laps: ILap[]; //Lap 	A collection of Lap objects.
    best_efforts: IDetailedSegmentEffort //DetailedSegmentEffort 	A collection of DetailedSegmentEffort objects. 
}

export interface IDetailedAthlete {
    id: number;//long 	The unique identifier of the athlete
    username: string | null;// not defined inside doc
    resource_state: number;//integer 	Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail"
    firstname: string; //string 	The athlete's first name.
    lastname: string;//string 	The athlete's last name.
    bio: string | null;
    profile_medium: string;//string 	URL to a 62x62 pixel profile picture.
    profile: string; //string 	URL to a 124x124 pixel profile picture.
    city: string;//string 	The athlete's city.
    state: string; //string 	The athlete's state or geographical region.
    country: string | null;//string 	The athlete's country.
    sex: "M" | "F";// string 	The athlete's sex. May take one of the following values: M, F
    premium: boolean;//boolean 	Deprecated. Use summit field instead. Whether the athlete has any Summit subscription.
    summit: boolean; //boolean 	Whether the athlete has any Summit subscription.
    created_at: string;//DateTime 	The time at which the athlete was created.
    updated_at: string; //DateTime 	The time at which the athlete was last updated.
    badge_type_id: null | number;
    friend: any | null; // ?????
    follower: any | null; // ????
    follower_count?: number;//integer 	The athlete's follower count.
    friend_count?: number;//integer 	The athlete's friend count.
    measurement_preference?: string; //string 	The athlete's preferred unit system. May take one of the following values: feet, meters
    ftp?: number;//integer 	The athlete's FTP (Functional Threshold Power).
    weight: number;//float 	The athlete's weight.
    clubs?: ISummaryClub; //SummaryClub 	The athlete's clubs.
    bikes?: ISummaryGear;//SummaryGear 	The athlete's bikes.
    shoes?: ISummaryGear;// SummaryGear 	The athlete's shoes. 
}

export interface IDetailedClub {
    id: number;//long 	The club's unique identifier.
    resource_state: number;//integer 	Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail"
    name: string;//string 	The club's name.
    profile_medium: string;//string 	URL to a 60x60 pixel profile picture.
    cover_photo: string;//string 	URL to a ~1185x580 pixel cover photo.
    cover_photo_small: string; //string 	URL to a ~360x176 pixel cover photo.
    sport_type: string; //string 	Deprecated. Prefer to use activity_types. May take one of the following values: cycling, running, triathlon, other
    activity_types: TActivityType[]; //ActivityType 	The activity types that count for a club. This takes precedence over sport_type.
    profile : string; // doc no present
    activity_types_icon : string; // doc no present
    dimensions : string[]; // doc no present
    description : string; // doc no present
    club_type : string; // doc no present
    website : string; // doc no present
    localized_sport_type : string;
    city: string; //string 	The club's city.
    state: string; //string 	The club's state or geographical region.
    country: string; //string 	The club's country.
    private: boolean;//boolean 	Whether the club is private.
    member_count: number;//integer 	The club's member count.
    featured: boolean; //boolean 	Whether the club is featured or not.
    verified: boolean;//boolean 	Whether the club is verified or not.
    url: string; //string 	The club's vanity URL.
    membership: string; //string 	The membership status of the logged-in athlete. May take one of the following values: member, pending
    admin: boolean; //boolean 	Whether the currently logged-in athlete is an administrator of this club.
    owner: boolean; //boolean 	Whether the currently logged-in athlete is the owner of this club.
    following_count: number;//integer 	The number of athletes in the club that the logged-in athlete follows. 
}

export interface IAthlete {
    id: number; //long 	The unique identifier of the athlete
    resource_state: 1 | 2 | 3; //Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail"
    firstname: string; //string 	The athlete's first name.
    lastname: string; //string 	The athlete's last name.
    profile_medium: string; //string 	URL to a 62x62 pixel profile picture.
    profile: string; // string 	URL to a 124x124 pixel profile picture.
    city: string; //string 	The athlete's city.
    state: string;// 	string : The athlete's state or geographical region.
    country: string; //string 	The athlete's country.
    sex: "M" | "F"; //string 	The athlete's sex. May take one of the following values: M, F
    premium: boolean; //boolean 	Deprecated. Use summit field instead. Whether the athlete has any Summit subscription.
    summit: boolean; //boolean 	Whether the athlete has any Summit subscription.
    created_at: string;//DateTime(string) 	The time at which the athlete was created.
    updated_at: string; //DateTime 	The time at which the athlete was last updated.
    follower_count: number; //integer 	The athlete's follower count.
    friend_count: number;//integer 	The athlete's friend count.
    measurement_preference: string;//string 	The athlete's preferred unit system. May take one of the following values: feet, meters
    ftp ?: number;//integer 	The athlete's FTP (Functional Threshold Power).
    weight: number; //float 	The athlete's weight.

    clubs ?: ISummaryClub; //SummaryClub 	The athlete's clubs.
    bikes ?: ISummaryGear;//SummaryGear 	The athlete's bikes.
    shoes ?: ISummaryGear; //SummaryGear 	The athlete's shoes. 
}

export interface ISummaryGear {
    id: string;//string 	The gear's unique identifier.
    resource_state: number;//integer 	Resource state, indicates level of detail. Possible values: 2 -> "summary", 3 -> "detail"
    primary: boolean;//boolean 	Whether this gear's is the owner's default one.
    name: string; //string 	The gear's name.
    distance: number;//    float 	The distance logged with this gear. 
}

export interface IComment {
    id: number;//long 	The unique identifier of this comment
    post_id ?: null | number; // np
    resource_state ?: number; // np
    mentions_metadata ?: null | string; // np
    cursor ?: null | string; // np
    reaction_count ?: null | number; // np
    has_reacted ?: boolean | null;
    activity_id: number;//long 	The identifier of the activity this comment is related to
    text: string; //string 	The content of the comment
    athlete: ISummaryAthlete; //SummaryAthlete 	An instance of SummaryAthlete.
    created_at: string;//DateTime 	The time at which this comment was created. 
}