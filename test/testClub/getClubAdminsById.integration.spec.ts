import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId : process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
});

describe('getClubAdminById', () => {

    test('base - should have a length of 5', async() => {
        let data = await ApiStrava.club.getClubAdminsById({id : 1219949, per_page : 5})
        console.log(data)
        expect(data.length).toBe(5)
    });
    test('base - should have a length of 3', async() => {
        let data = await ApiStrava.club.getClubAdminsById({id : 1219949, per_page : 3})
        console.log(data)
        expect(data.length).toBe(3)
    });
});