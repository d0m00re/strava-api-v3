class StravaApi {
    private accessToken : string;
    private baseUrl : string = "https://www.strava.com/api/v3";

    constructor(accessToken : string) {
        this.accessToken = accessToken;
    }

    async fetchAthleteProfile() {
        try {
            const response = await fetch(`${this.baseUrl}/athlete`, {
                headers : {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                method : "GET"
            }).then(resp => resp.json());

            return response
        } catch (error) {
            console.error('Error fetching athlete profile:', error);
            throw error;
        }
    }
}

export default StravaApi;