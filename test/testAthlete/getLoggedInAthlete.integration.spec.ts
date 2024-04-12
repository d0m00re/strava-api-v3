import * as strava from "./../../src/";
/*
    accessToken : string;
    clientId : string;
    clientSecret : string;
    refreshToken ?: string;
*/
describe('getLoggedInAthlete', () => {
    test('firstname', async () => {
        const ApiStrava = new strava.Strava({
            accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId : process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        let data = await ApiStrava.athlete.getLoggedInAthlete()
        console.log("resp")
        console.log(data)
        expect(data.firstname).toBe("Jack")
    });
});