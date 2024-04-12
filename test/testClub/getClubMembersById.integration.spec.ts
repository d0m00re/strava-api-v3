import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId : process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
});

describe('getClubMembersById', () => {

    test('base - should have a length of 30', async() => {
        let data = await ApiStrava.club.getClubMembersById({id : 1219949})
        console.log(data)
        expect(data.length).toBe(30)
    });
    test('base - should have a length of 10', async() => {
        let data = await ApiStrava.club.getClubMembersById({id : 1219949, per_page : 10})
        console.log(data)
        expect(data.length).toBe(10)
    });
});