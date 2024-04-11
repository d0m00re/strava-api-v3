import * as strava from "./../../src/";

const ApiStrava = new strava.Strava(process.env.STRAVA_ACCESS_TOKEN ?? "");

// no valid id for the moments
describe('getGearById', () => {
    test('gear b1231', async() => {
        console.log("process env ")
        console.log(process.env)
        let data = await ApiStrava.getGearById({id : "17274562"})
        console.log(data)
        expect(data.brand_name).toBe("BMC")
    });
});