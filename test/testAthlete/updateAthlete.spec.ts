import * as strava from "./../../src/";

describe('updateAthlete', () => {
    test('change weight', async () => {
        const ApiStrava = new strava.Strava({
            accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId: process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        const data = await ApiStrava.athlete.updateLoggedInAthlete({ weight: 74.9 })
        console.log("resp")
        console.log(data)
        expect(data.weight).toBe(74.9);
    });
});