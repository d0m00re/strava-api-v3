# !!!!! DON T USE THIS CODE FOR THE MOMENT

# strava-api-v3
`learn and create strava wrapper api implementation with ts/fetch`

## .env.exemple
`.env exemple -> use that for testing purpose`

## usage
```
futur usage here
```

## api routes

## -------------------------------------

## Get oauth token :

`thank s to https://github.com/franchyze923/Code_From_Tutorials/blob/master/Strava_Api/request_links.txt`

```
1) Get authorization code from authorization page. This is a one time, manual step. 
Paste the below code in a browser, hit enter then grab the "code" part from the resulting url. 

https://www.strava.com/oauth/authorize?client_id=your_client_id&redirect_uri=http://localhost&response_type=code&scope=activity:read_all
```

```
2) Exchange authorization code for access token & refresh token

https://www.strava.com/oauth/token?client_id=your_client_id&client_secret=your_client_secret&code=your_code_from_previous_step&grant_type=authorization_code
```

```
3) View your activities using the access token just received

https://www.strava.com/api/v3/athlete/activities?access_token=access_token_from_previous_step
```

```
4) Use refresh token to get new access tokens

https://www.strava.com/oauth/token?client_id=your_client_id&client_secret=your_client_secret&refresh_token=your_refresh_token_from_previous_step&grant_type=refresh_token
```


## todo list
* integration test
* entity system : some field mismatch between doc and api, for exemple some field missing, or could be null or no present
* unit test
* mocking test
* check upload
* check stream implementation

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

## club member
member no present
membership : 'member' | ???