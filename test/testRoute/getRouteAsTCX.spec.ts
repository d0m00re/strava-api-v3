import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId: process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
});

describe('getRouteAsTCX', () => {
    test('test', async () => {
        const data = await ApiStrava.route.getRouteAsTCX({ id: "3175080533840625586" })
        console.log("data")
        console.log(data)
        expect(data.length).toBeGreaterThan(100)
    });
});