import * as strava from "./../../src/";

describe('getClubById', () => {
    test('club name', async() => {
        const ApiStrava = new strava.Strava(process.env.STRAVA_ACCESS_TOKEN ?? "");
        let data = await ApiStrava.getClubById({id : 1219949})
        console.log(data)
        expect(data.name).toBe("HiPRO France")
    });
});