import * as strava from "./../../src/";
/*
    accessToken : string;
    clientId : string;
    clientSecret : string;
    refreshToken ?: string;
*/
describe('getAthleteStats', () => {
    test('base', async () => {
        const ApiStrava = new strava.Strava({
            accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId : process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        let userId = parseInt(process.env.STRAVA_USER_ID ?? "0");
        console.log("check for user id : ", userId)

        let data = await ApiStrava.athlete.getStats({id : userId})
        console.log("resp")
        console.log(data)
        expect(data.all_run_totals?.count).toBeGreaterThanOrEqual(83)
        expect(data.all_run_totals?.distance).toBeGreaterThanOrEqual(740000)
        expect(data.all_run_totals?.moving_time).toBeGreaterThanOrEqual(273000)
        expect(data.all_run_totals?.elapsed_time).toBeGreaterThanOrEqual(131060)
        expect(data.all_run_totals?.elevation_gain).toBeGreaterThanOrEqual(2000)

        expect(data.ytd_run_totals?.count).toBeGreaterThanOrEqual(30)
        expect(data.ytd_run_totals?.distance).toBeGreaterThanOrEqual(100000)
        expect(data.ytd_run_totals?.moving_time).toBeGreaterThanOrEqual(100000)
        expect(data.ytd_run_totals?.elapsed_time).toBeGreaterThanOrEqual(100000)
        expect(data.ytd_run_totals?.elevation_gain).toBeGreaterThanOrEqual(1000)
    });
});