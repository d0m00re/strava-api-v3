// todo : invalid gear id 
import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId: process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
});

describe('getGearById', () => {
    test('gear b1231', async () => {
        const data = await ApiStrava.gear.getGearById({ id: process.env.STRAVA_GEAR_ID ?? "" })
        console.log(data)
        expect(data.brand_name).toBe("BMC")
    });
});