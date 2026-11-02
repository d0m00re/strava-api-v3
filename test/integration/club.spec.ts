import { expect } from "vitest";
import { client, describeIntegration, testWithId } from "./setup";

describeIntegration("club", () => {
    testWithId("STRAVA_CLUB_ID", "getClubById", async id => {
        const data = await client.club.getClubById({ id: Number(id) });
        expect(data.id).toBe(Number(id));
    });

    testWithId("STRAVA_CLUB_ID", "getClubMembersById respects per_page", async id => {
        const data = await client.club.getClubMembersById({ id, per_page: 3 });
        expect(data.length).toBeLessThanOrEqual(3);
    });

    testWithId("STRAVA_CLUB_ID", "getClubAdminsById respects per_page", async id => {
        const data = await client.club.getClubAdminsById({ id: Number(id), per_page: 2 });
        expect(data.length).toBeLessThanOrEqual(2);
    });

    testWithId("STRAVA_CLUB_ID", "getClubActivitiesById respects per_page", async id => {
        const data = await client.club.getClubActivitiesById({ id: Number(id), per_page: 3 });
        expect(data.length).toBeLessThanOrEqual(3);
    });
});
