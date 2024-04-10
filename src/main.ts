import StravaApi from "./api/StravaApi";

const accessKey = 'strava_access_key';
const strava = new StravaApi(accessKey);

const main = async () => {
    try {
        const profile = await strava.getLoggedInAthlete();
        console.log(profile);
    }
    catch(err) {
        console.error(err);
    }
}

main();