import { expect, test } from "vitest";
import { client, describeIntegration, testWithId, testWrite } from "./setup";

describeIntegration("segment", () => {
    test("exploreSegments", async () => {
        const data = await client.segment.exploreSegments({
            bounds: "37.821362,-122.505373,37.842038,-122.465977",
            activity_type: "running",
        });
        expect(Array.isArray(data.segments)).toBe(true);
    });

    test("getLoggedInAthleteStarredSegments", async () => {
        expect(Array.isArray(await client.segment.getLoggedInAthleteStarredSegments({ per_page: 2 }))).toBe(true);
    });

    testWithId("STRAVA_SEGMENT_ID", "getSegmentById", async id => {
        const data = await client.segment.getSegmentById({ id: Number(id) });
        expect(data.id).toBe(Number(id));
    });

    testWithId("STRAVA_SEGMENT_ID", "getSegmentStreams", async id => {
        const data = await client.segment.getSegmentStreams({ id, keys: ["latlng"], key_by_type: true });
        expect(data.latlng?.data.length).toBeGreaterThan(0);
    });

    testWrite("starSegment toggles and restores the star", async () => {
        const id = Number(process.env.STRAVA_SEGMENT_ID);
        const before = await client.segment.getSegmentById({ id });
        const toggled = await client.segment.starSegment({ id, starred: !before.starred });
        expect(toggled.starred).toBe(!before.starred);
        await client.segment.starSegment({ id, starred: before.starred ?? false });
    });
});

// List / get segment efforts need a Strava subscription
describeIntegration("segmentEffort", () => {
    testWithId("STRAVA_SEGMENT_ID", "getEffortsBySegmentId", async id => {
        expect(Array.isArray(await client.segmentEffort.getEffortsBySegmentId({ segment_id: Number(id) }))).toBe(true);
    });

    testWithId("STRAVA_SEGMENT_EFFORT_ID", "getSegmentEffortById", async id => {
        const data = await client.segmentEffort.getSegmentEffortById({ id });
        expect(String(data.id)).toBe(id);
    });

    testWithId("STRAVA_SEGMENT_EFFORT_ID", "getSegmentEffortStreams", async id => {
        const data = await client.segmentEffort.getSegmentEffortStreams({ id, keys: ["distance"], key_by_type: true });
        expect(Array.isArray(data.distance?.data)).toBe(true);
    });
});
