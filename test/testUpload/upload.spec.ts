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

describe('getSegmentEffortStreams', () => {
    test('base', async () => {
        const ApiStrava = new strava.Strava({
            accessToken: process.env.STRAVA_ACCESS_TOKEN ?? "",
            refreshToken: process.env.STRAVA_REFRESH_TOKEN ?? "",
            clientId: process.env.STRAVA_CLIENT_ID ?? "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET ?? ""
        });

        const path = "./test/testUpload/test.gpx";
        const fd = await fs.open(path);
        const readStream = fd.createReadStream();
        //const buffer = await fs.readFile("./test/testUpload/test.gpx");
        //const file = new File([buffer], "test.gpx", { type: "application/gpx+xml" });
        //const data = await ApiStrava.segmentEffort.getSegmentEffortStreams({ id: '0', keys: ["heartrate"], key_by_type: true })
       // console.log("file")
       // console.log(buffer)

       let formData = new FormData();
       formData.append("name", "fake activity");
       formData.append('description', "api test"),
       formData.append('trainer', "test"),
       formData.append('commute', "test"),
       formData.append('data_type', "gpx"),
       formData.append('external_id', "xdadadqeeqeqqe")
      // formData.append("file", readStream);

        const data = await ApiStrava.upload.createUpload({
            file : readStream,
            name : "fake activity",
            description : "api test",
            trainer : "test",
            commute : "test",
            data_type : "gpx",
            external_id : "xdadadqeeqeqqe"
        });
        console.log("resp")
        console.log(data)
        expect(10).toBeGreaterThan(1);
    });
});