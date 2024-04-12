import * as strava from "./../../src/";

describe('getClubActivitesById', () => {
    test('club', async() => {
        const ApiStrava = new strava.Strava({
            accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId : process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
        });
        let data = await ApiStrava.club.getClubActivitiesById({id : 1219949, per_page : 3})
        console.log(data)
        expect(data.length).toBe(3)
    });
});