import * as strava from "./../../src/";

const accessKey = '802b1653c9cc03b23cf16c8103705e3ee9728b9b';
const ApiStrava = new strava.Strava(accessKey);

describe('getClubActivitesById', () => {
    test('club', async() => {
        let data = await ApiStrava.getClubActivitiesById({id : 1219949, per_page : 3})
        console.log(data)
        expect(data.length).toBe(3)
    });
});