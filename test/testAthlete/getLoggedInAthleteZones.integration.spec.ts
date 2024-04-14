import * as strava from "./../../src/";

describe('getLoggedInAthletesZones', () => {
    test('firstname', async () => {
        const ApiStrava = new strava.Strava({
            accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId: process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
        });
        const data = await ApiStrava.athlete.getLoggedInAthleteZones()
        console.log("resp")
        console.log(data)
        expect(typeof (data.heart_rate.custom_zones)).toBe("boolean");
        expect(data.heart_rate.zones.length).toBeGreaterThan(0);
    });
});