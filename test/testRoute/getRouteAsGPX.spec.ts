import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId: process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
});

// no valid id for the moments
describe('getRouteAsGPX', () => {
    test('test', async () => {
        let data = await ApiStrava.route.getRouteAsGPX({ id: "3175080533840625586" })
        console.log("data")
        console.log(data)
        expect(data.length).toBeGreaterThan(100)
    });
});