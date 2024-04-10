import * as strava from "./../src/";

const accessKey = 'stravaAccessKey';
const ApiStrava = new strava.Strava(accessKey);

describe('strava api v3', () => {
    test('hello', () => {
        ApiStrava.getLoggedInAthlete()
        .then(resp => {
            console.log("resp")
            console.log(resp)
            expect(resp.firstname).toBe("Jack")
        })
        .catch(err => {
            console.log(err)
            expect(1).toBe(2)
        })
    });
});