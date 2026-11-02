import { expect, test } from "vitest";
import { client, describeIntegration, testWrite } from "./setup";

describeIntegration("athlete", () => {
    test("getLoggedInAthlete", async () => {
        const data = await client.athlete.getLoggedInAthlete();
        expect(typeof data.id).toBe("number");
        expect(typeof data.firstname).toBe("string");
    });

    test("getLoggedInAthleteActivities", async () => {
        const data = await client.athlete.getLoggedInAthleteActivities({ page: 1, per_page: 2 });
        expect(data.length).toBeLessThanOrEqual(2);
    });

    test("getLoggedInAthleteZones", async () => {
        const data = await client.athlete.getLoggedInAthleteZones();
        expect(typeof data.heart_rate.custom_zones).toBe("boolean");
    });

    test("getLoggedInAthleteClubs", async () => {
        const data = await client.athlete.getLoggedInAthleteClubs({ per_page: 2 });
        expect(data.length).toBeLessThanOrEqual(2);
    });

    test("getStats", async () => {
        const me = await client.athlete.getLoggedInAthlete();
        const data = await client.athlete.getStats({ id: me.id });
        expect(data.all_run_totals?.count).toBeGreaterThanOrEqual(0);
    });

    test("getRoutesByAthleteId", async () => {
        const me = await client.athlete.getLoggedInAthlete();
        expect(Array.isArray(await client.athlete.getRoutesByAthleteId({ id: me.id, page: 1, per_page: 2 }))).toBe(
            true,
        );
    });

    testWrite("updateLoggedInAthlete keeps the current weight", async () => {
        const me = await client.athlete.getLoggedInAthlete();
        const data = await client.athlete.updateLoggedInAthlete({ weight: me.weight });
        expect(data.weight).toBe(me.weight);
    });
});
