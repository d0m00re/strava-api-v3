import { expect } from "vitest";
import { client, describeIntegration, testWithId } from "./setup";

describeIntegration("activity", () => {
    testWithId("STRAVA_ACTIVITY_ID", "getActivityById", async id => {
        const data = await client.activity.getActivityById({ id: Number(id) });
        expect(data.id).toBe(Number(id));
        expect(typeof data.name).toBe("string");
    });

    testWithId("STRAVA_ACTIVITY_ID", "getActivityStreams", async id => {
        const data = await client.activity.getActivityStreams({ id, keys: ["latlng", "distance"], key_by_type: true });
        expect(Array.isArray(data.distance?.data)).toBe(true);
    });

    testWithId("STRAVA_ACTIVITY_ID", "getCommentsByActivityId", async id => {
        expect(Array.isArray(await client.activity.getCommentsByActivityId({ id: Number(id) }))).toBe(true);
    });

    testWithId("STRAVA_ACTIVITY_ID", "getKudoersByActivityId", async id => {
        expect(Array.isArray(await client.activity.getKudoersByActivityId({ id: Number(id) }))).toBe(true);
    });

    testWithId("STRAVA_ACTIVITY_ID", "getLapsByActivityId", async id => {
        expect(Array.isArray(await client.activity.getLapsByActivityId({ id: Number(id) }))).toBe(true);
    });

    // Summit feature, 402 / 403 without subscription
    testWithId("STRAVA_ACTIVITY_ID", "getZonesByActivityId", async id => {
        expect(Array.isArray(await client.activity.getZonesByActivityId({ id: Number(id) }))).toBe(true);
    });
});
