import { describe, expect, test } from "vitest";
import { StravaNotFoundError } from "../../src";
import { BASE_URL, createClient, fetchCall, jsonResponse, mockFetch } from "./helpers";

type Client = ReturnType<typeof createClient>;

interface IEndpointCase {
    name: string;
    call: (client: Client) => Promise<unknown>;
    method: string;
    path: string;
    query?: Record<string, string>;
    body?: unknown; // json body
}

// every endpoint that goes through StravaApi.request, upload and oauth have their own tests
const endpoints: IEndpointCase[] = [
    // activity
    {
        name: "activity.createActivity",
        call: c =>
            c.activity.createActivity({
                name: "Run",
                sport_type: "Run",
                start_date_local: "2026-01-01T10:00:00Z",
                elapsed_time: 600,
            }),
        method: "POST",
        path: "/activities",
        body: { name: "Run", sport_type: "Run", start_date_local: "2026-01-01T10:00:00Z", elapsed_time: 600 },
    },
    {
        name: "activity.getActivityById",
        call: c => c.activity.getActivityById({ id: 42, include_all_efforts: true }),
        method: "GET",
        path: "/activities/42",
        query: { include_all_efforts: "true" },
    },
    {
        name: "activity.getCommentsByActivityId",
        call: c => c.activity.getCommentsByActivityId({ id: 42, after_cursor: "abc" }),
        method: "GET",
        path: "/activities/42/comments",
        query: { page_size: "30", after_cursor: "abc" },
    },
    {
        name: "activity.getKudoersByActivityId",
        call: c => c.activity.getKudoersByActivityId({ id: 42, per_page: 10 }),
        method: "GET",
        path: "/activities/42/kudos",
        query: { page: "1", per_page: "10" },
    },
    {
        name: "activity.getLapsByActivityId",
        call: c => c.activity.getLapsByActivityId({ id: 42 }),
        method: "GET",
        path: "/activities/42/laps",
    },
    {
        name: "activity.getZonesByActivityId",
        call: c => c.activity.getZonesByActivityId({ id: 42 }),
        method: "GET",
        path: "/activities/42/zones",
    },
    {
        name: "activity.updateActivityById",
        call: c => c.activity.updateActivityById({ id: 42, body: { name: "Renamed" } }),
        method: "PUT",
        path: "/activities/42",
        body: { name: "Renamed" },
    },
    {
        name: "activity.getActivityStreams",
        call: c => c.activity.getActivityStreams({ id: 42, keys: ["heartrate", "latlng"], key_by_type: true }),
        method: "GET",
        path: "/activities/42/streams",
        query: { keys: "heartrate,latlng", key_by_type: "true" },
    },

    // athlete
    {
        name: "athlete.getLoggedInAthleteActivities",
        call: c => c.athlete.getLoggedInAthleteActivities({ page: 2, per_page: 50, after: 1700000000 }),
        method: "GET",
        path: "/athlete/activities",
        query: { page: "2", per_page: "50", after: "1700000000" },
    },
    {
        name: "athlete.getLoggedInAthlete",
        call: c => c.athlete.getLoggedInAthlete(),
        method: "GET",
        path: "/athlete",
    },
    {
        name: "athlete.getLoggedInAthleteZones",
        call: c => c.athlete.getLoggedInAthleteZones(),
        method: "GET",
        path: "/athlete/zones",
    },
    {
        name: "athlete.getStats",
        call: c => c.athlete.getStats({ id: 7 }),
        method: "GET",
        path: "/athletes/7/stats",
    },
    {
        name: "athlete.updateLoggedInAthlete",
        call: c => c.athlete.updateLoggedInAthlete({ weight: 70.5 }),
        method: "PUT",
        path: "/athlete",
        query: { weight: "70.5" },
    },
    {
        name: "athlete.getLoggedInAthleteClubs",
        call: c => c.athlete.getLoggedInAthleteClubs({}),
        method: "GET",
        path: "/athlete/clubs",
        query: { page: "1", per_page: "30" },
    },
    {
        name: "athlete.getRoutesByAthleteId",
        call: c => c.athlete.getRoutesByAthleteId({ id: 7, page: 1, per_page: 5 }),
        method: "GET",
        path: "/athletes/7/routes",
        query: { page: "1", per_page: "5" },
    },

    // club
    {
        name: "club.getClubActivitiesById",
        call: c => c.club.getClubActivitiesById({ id: 9, per_page: 3 }),
        method: "GET",
        path: "/clubs/9/activities",
        query: { page: "1", per_page: "3" },
    },
    {
        name: "club.getClubAdminsById",
        call: c => c.club.getClubAdminsById({ id: 9 }),
        method: "GET",
        path: "/clubs/9/admins",
        query: { page: "1", per_page: "30" },
    },
    {
        name: "club.getClubById",
        call: c => c.club.getClubById({ id: 9 }),
        method: "GET",
        path: "/clubs/9",
    },
    {
        name: "club.getClubMembersById",
        call: c => c.club.getClubMembersById({ id: "9", page: 2 }),
        method: "GET",
        path: "/clubs/9/members",
        query: { page: "2", per_page: "30" },
    },

    // gear
    {
        name: "gear.getGearById",
        call: c => c.gear.getGearById({ id: "b123" }),
        method: "GET",
        path: "/gear/b123",
    },

    // route
    {
        name: "route.getRouteById",
        call: c => c.route.getRouteById({ id: "3175080533840625586" }),
        method: "GET",
        path: "/routes/3175080533840625586",
    },
    {
        name: "route.getRouteStreams",
        call: c => c.route.getRouteStreams({ id: "3175080533840625586" }),
        method: "GET",
        path: "/routes/3175080533840625586/streams",
    },

    // segment
    {
        name: "segment.exploreSegments",
        call: c => c.segment.exploreSegments({ bounds: "37.82,-122.50,37.84,-122.46", activity_type: "running" }),
        method: "GET",
        path: "/segments/explore",
        query: { bounds: "37.82,-122.50,37.84,-122.46", activity_type: "running" },
    },
    {
        name: "segment.getLoggedInAthleteStarredSegments",
        call: c => c.segment.getLoggedInAthleteStarredSegments(),
        method: "GET",
        path: "/segments/starred",
        query: { page: "1", per_page: "30" },
    },
    {
        name: "segment.getSegmentById",
        call: c => c.segment.getSegmentById({ id: 22729684 }),
        method: "GET",
        path: "/segments/22729684",
    },
    {
        name: "segment.starSegment",
        call: c => c.segment.starSegment({ id: 22729684, starred: true }),
        method: "PUT",
        path: "/segments/22729684/starred",
        query: { starred: "true" },
    },
    {
        name: "segment.getSegmentStreams",
        call: c => c.segment.getSegmentStreams({ id: "22729684", keys: ["latlng", "altitude"], key_by_type: true }),
        method: "GET",
        path: "/segments/22729684/streams",
        query: { keys: "latlng,altitude", key_by_type: "true" },
    },

    // segment effort
    {
        name: "segmentEffort.getEffortsBySegmentId",
        call: c =>
            c.segmentEffort.getEffortsBySegmentId({ segment_id: 22729684, start_date_local: "2026-01-01T00:00:00Z" }),
        method: "GET",
        path: "/segment_efforts",
        query: { segment_id: "22729684", start_date_local: "2026-01-01T00:00:00Z", per_page: "30" },
    },
    {
        name: "segmentEffort.getSegmentEffortById",
        call: c => c.segmentEffort.getSegmentEffortById({ id: 555 }),
        method: "GET",
        path: "/segment_efforts/555",
    },
    {
        name: "segmentEffort.getSegmentEffortStreams",
        call: c => c.segmentEffort.getSegmentEffortStreams({ id: 555, keys: ["heartrate"], key_by_type: true }),
        method: "GET",
        path: "/segment_efforts/555/streams",
        query: { keys: "heartrate", key_by_type: "true" },
    },

    // upload
    {
        name: "upload.getUploadById",
        call: c => c.upload.getUploadById({ uploadId: 123 }),
        method: "GET",
        path: "/uploads/123",
    },
];

describe.each(endpoints)("$name", ({ call, method, path, query = {}, body }) => {
    test(`${method} ${path}`, async () => {
        const fetch = mockFetch(jsonResponse({ id: 1 }));
        await expect(call(createClient())).resolves.toEqual({ id: 1 });

        expect(fetch).toHaveBeenCalledTimes(1);
        const req = fetchCall(fetch);
        expect(req.method).toBe(method);
        expect(req.url.origin + req.url.pathname).toBe(BASE_URL + path);
        expect(Object.fromEntries(req.url.searchParams)).toEqual(query);
        expect(req.headers.Authorization).toBe("Bearer ACCESS_TOKEN");
        if (body === undefined) {
            expect(req.body).toBeUndefined();
        } else {
            expect(req.headers["Content-Type"]).toBe("application/json");
            expect(JSON.parse(req.body as string)).toEqual(body);
        }
    });

    test("throws a StravaError on a non 2xx response", async () => {
        mockFetch(jsonResponse({ message: "Record Not Found", errors: [] }, { status: 404 }));
        await expect(call(createClient())).rejects.toThrow(StravaNotFoundError);
    });
});

describe("route exports", () => {
    test.each([
        ["getRouteAsGPX", "export_gpx"],
        ["getRouteAsTCX", "export_tcx"],
    ] as const)("%s returns the raw file as text", async (method, path) => {
        const fetch = mockFetch(new Response("<xml/>"));
        await expect(createClient().route[method]({ id: "77" })).resolves.toBe("<xml/>");
        expect(fetchCall(fetch).url.toString()).toBe(`${BASE_URL}/routes/77/${path}`);
    });
});
