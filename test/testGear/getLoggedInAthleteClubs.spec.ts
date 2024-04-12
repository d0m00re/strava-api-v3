import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId : process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
});

// no valid id for the moments
describe('getGearById', () => {
    test('gear b1231', async() => {
        let data = await ApiStrava.gear.getGearById({id : "17274562"})
        console.log(data)
        expect(data.brand_name).toBe("BMC")
    });
});