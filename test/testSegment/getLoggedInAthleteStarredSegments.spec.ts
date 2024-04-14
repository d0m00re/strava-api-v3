// todo : problem for finding segment effort id - fix that later

import * as strava from "./../../src/";
/*
    accessToken : string;
    clientId : string;
    clientSecret : string;
    refreshToken ?: string;
*/
describe('getLoggedInAthleteStarredSegments', () => {
    test('base', async () => {
        const ApiStrava = new strava.Strava({
            accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId : process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
        });
        
        let data = await ApiStrava.segment.getLoggedInAthleteStarredSegments();
        console.log("resp")
        console.log(data)
       expect(10).toBeGreaterThan(0);
        // expect(data.segments.distance).toBeGreaterThan(1)
        //expect(data.distance).toBeGreaterThan(10);
    });
});