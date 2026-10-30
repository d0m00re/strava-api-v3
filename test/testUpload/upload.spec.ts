/*
file
File, in form 	The uploaded file.
name
String, in form 	The desired name of the resulting activity.
description
String, in form 	The desired description of the resulting activity.
trainer
String, in form 	Whether the resulting activity should be marked as having been performed on a trainer.
commute
String, in form 	Whether the resulting activity should be tagged as a commute.
data_type
String, in form 	The format of the uploaded file. May take one of the following values: fit, fit.gz, tcx, tcx.gz, gpx, gpx.gz
external_id
String, in form 	The desired external identifier of the resulting activity. 
*/
import fs from "fs/promises";
import * as strava from "./../../src/";

describe('createUpload', () => {
    test('base', async () => {
        const ApiStrava = new strava.Strava({
            accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId: process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        const file = await fs.readFile("./test/testUpload/test.gpx");

        const data = await ApiStrava.upload.createUpload({
            file,
            name : "fake activity",
            description : "api test",
            trainer : "test",
            commute : "test",
            data_type : "gpx",
            external_id : "xdadadqeeqeqqe"
        });
        expect(data.id).toBeDefined();
    });
});