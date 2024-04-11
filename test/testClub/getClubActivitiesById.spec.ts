import * as strava from "./../../src/";

describe('getClubActivitesById', () => {
    test('club', async() => {
        const ApiStrava = new strava.Strava(process.env.STRAVA_ACCESS_TOKEN ?? "");
        let data = await ApiStrava.getClubActivitiesById({id : 1219949, per_page : 3})
        console.log(data)
        expect(data.length).toBe(3)
    });
});