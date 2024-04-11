import * as strava from "./../../src/";

const accessKey = 'xxxx';
const ApiStrava = new strava.Strava(accessKey);

describe('getClubAdminById', () => {

    test('base - should have a length of 5', async() => {
        let data = await ApiStrava.getClubAdminsById({id : 1219949, per_page : 5})
        console.log(data)
        expect(data.length).toBe(5)
    });
    test('base - should have a length of 3', async() => {
        let data = await ApiStrava.getClubAdminsById({id : 1219949, per_page : 3})
        console.log(data)
        expect(data.length).toBe(3)
    });
});