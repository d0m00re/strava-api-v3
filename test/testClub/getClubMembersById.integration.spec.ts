import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId: process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
});

describe('getClubMembersById', () => {
    test('base - should have a length of 30', async () => {
        const data = await ApiStrava.club.getClubMembersById({ id: process.env.STRAVA_CLUB_ID ?? "" })
        console.log(data)
        expect(data.length).toBe(30)
    });
    test('base - should have a length of 10', async () => {
        const data = await ApiStrava.club.getClubMembersById({ id: process.env.STRAVA_CLUB_ID ?? "", per_page: 10 })
        console.log(data)
        expect(data.length).toBe(10)
    });
});