import * as strava from "./../../src/";

const ApiStrava = new strava.Strava(process.env.STRAVA_ACCESS_TOKEN ?? "");

describe('getLoggedInAthleteClubs', () => {
    test('club', async() => {
        let data = await ApiStrava.getLoggedInAthleteClubs({per_page : 2})
        console.log(data)
        expect(data.length).toBe(2)
    });
});