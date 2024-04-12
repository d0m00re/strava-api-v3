import * as strava from "./../../src/";

describe('getLoggedInAthlete', () => {
    test('firstname', async () => {
        const ApiStrava = new strava.Strava({
            accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId : process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
        }); 
        let data = await ApiStrava.athlete.getLoggedInAthleteZones()
        console.log("resp")
        console.log(data)
        expect(data.heart_rate).toBe("Jack")
    });
});