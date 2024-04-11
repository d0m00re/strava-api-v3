import * as strava from "./../../src/";

describe('getLoggedInAthlete', () => {
    test('firstname', async () => {
        const accessKey = 'strava_secret';
        const ApiStrava = new strava.Strava(accessKey);
        let data = await ApiStrava.getLoggedInAthlete()
        console.log("resp")
        console.log(data)
        expect(data.firstname).toBe("Jack")
    });
});