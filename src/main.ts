import StravaApi from "./api/StravaApi";

const accessKey = 'xxxx';
const strava = new StravaApi(accessKey);

const main = async () => {
    try {
        const profile = await strava.fetchAthleteProfile();
        console.log(profile);
    }
    catch(err) {
        console.error(err);
    }
}

main();