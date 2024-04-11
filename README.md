# !!!!! DON T USE THIS CODE FOR THE MOMENT

# strava-api-v3
learn and create strava wrapper api implementation with ts/fetch

## .env.exemple
`.env exemple -> use that for testing purpose`

## API ROUTES
### athlete
* getLoggedInAthlete : ok

### club
* getClubById : ok
* getClubActivitiesById

# api problem :
## DetailedAthlete
* username not defined inside the documentation for DetailedAthlete doc object
* bio same
* badge_type_id
* friend: any | null; // ?????
* follower : any | null; // ????
* check request with bool and array
* check stream request
* check upload request


## detailed club
* profile : string; // doc no present
* activity_types_icon : string; // doc no present
* dimensions : string[]; // doc no present
* localized_sport_type : string; // same
* description : string; // doc no present
* club_type : string; // doc no present
* website : string; // doc no present

# club member
member no prsent
membership : 'member' | ???