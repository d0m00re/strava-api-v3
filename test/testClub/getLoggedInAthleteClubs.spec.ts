import * as strava from "./../../src/";

const accessKey = 'xxxxx';
const ApiStrava = new strava.Strava(accessKey);

describe('getLoggedInAthleteClubs', () => {
    test('club', async() => {
        let data = await ApiStrava.getLoggedInAthleteClubs({per_page : 2})
        console.log(data)
        expect(data.length).toBe(2)
    });
});