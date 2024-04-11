import * as strava from "./../../src/";

const accessKey = 'strava_test';
const ApiStrava = new strava.Strava(accessKey);

describe('getClubMembersById', () => {

    test('base - should have a length of 30', async() => {
        let data = await ApiStrava.getClubMembersById({id : 1219949})
        console.log(data)
        expect(data.length).toBe(30)
    });
    test('base - should have a length of 10', async() => {
        let data = await ApiStrava.getClubMembersById({id : 1219949, per_page : 10})
        console.log(data)
        expect(data.length).toBe(10)
    });
});