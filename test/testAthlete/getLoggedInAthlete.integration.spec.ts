import * as strava from "./../../src/";

describe('getLoggedInAthlete', () => {
    test('firstname', async () => {
        const ApiStrava = new strava.Strava(process.env.STRAVA_ACCESS_TOKEN ?? "");
        let data = await ApiStrava.getLoggedInAthlete()
        console.log("resp")
        console.log(data)
        expect(data.firstname).toBe("Jack")
    });
});