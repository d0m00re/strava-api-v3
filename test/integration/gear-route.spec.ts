import { expect } from "vitest";
import { client, describeIntegration, testWithId } from "./setup";

describeIntegration("gear", () => {
    testWithId("STRAVA_GEAR_ID", "getGearById", async id => {
        const data = await client.gear.getGearById({ id });
        expect(data.id).toBe(id);
    });
});

describeIntegration("route", () => {
    testWithId("STRAVA_ROUTE_ID", "getRouteById", async id => {
        const data = await client.route.getRouteById({ id });
        expect(data.id_str).toBe(id);
    });

    testWithId("STRAVA_ROUTE_ID", "getRouteStreams", async id => {
        const data = await client.route.getRouteStreams({ id });
        expect(data.find(stream => stream.type === "latlng")?.data.length).toBeGreaterThan(0);
    });

    testWithId("STRAVA_ROUTE_ID", "getRouteAsGPX", async id => {
        expect(await client.route.getRouteAsGPX({ id })).toContain("<gpx");
    });

    testWithId("STRAVA_ROUTE_ID", "getRouteAsTCX", async id => {
        expect(await client.route.getRouteAsTCX({ id })).toContain("<TrainingCenterDatabase");
    });
});
