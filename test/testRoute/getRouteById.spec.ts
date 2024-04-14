import * as strava from "./../../src/";

const ApiStrava = new strava.Strava({
    accessToken : process.env.STRAVA_ACCESS_TOKEN ?? "",
    refreshToken : process.env.STRAVA_REFRESH_TOKEN ?? "",
    clientId : process.env.STRAVA_CLIENT_ID ?? "",
    clientSecret : process.env.STRAVA_CLIENT_SECRET ?? ""
});

// no valid id for the moments
describe('getRouteById', () => {
    test('test', async() => {
        let data = await ApiStrava.route.getRouteById({id : "3175080533840625586"})
        console.log("data")
        console.log(data)
        expect(data.name).toEqual("plages et chemins")
        //expect(data.brand_name).toBe("BMC")
    });
});