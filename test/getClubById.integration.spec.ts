import * as strava from "./../src/";

describe('getClubById', () => {
    test('club name', async() => {
        const accessKey = 'strava_secret';
        const ApiStrava = new strava.Strava(accessKey);
        let data = await ApiStrava.getClubById({id : 1219949})
        console.log(data)
        expect(data.name).toBe("HiPRO France")
    });
});