import * as strava from "./../src/";

const accessKey = 'strava_access_key';
const ApiStrava = new strava.Strava(accessKey);

describe('test module', () => {
    test('hello', async () => {
        let data = await ApiStrava.getLoggedInAthlete()
        expect(1).toBe(1);
    });
});