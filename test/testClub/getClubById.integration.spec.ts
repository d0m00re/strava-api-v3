import * as strava from "./../../src/";

describe('getClubById', () => {
    test('club name', async() => {
        const ApiStrava = new strava.Strava({
            accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId : process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
        });
        let data = await ApiStrava.club.getClubById({id : 1219949})
        console.log(data)
        expect(data.name).toBe("HiPRO France")
    });
});