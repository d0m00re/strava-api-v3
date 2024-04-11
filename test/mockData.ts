import * as entity from "./../src/entity/strava.entity";

export const detailedAthlete : entity.IDetailedAthlete = {
    id: 1111,
    username: null,
    resource_state: 2,
    firstname: 'john',
    lastname: 'snow',
    bio: 'a description',
    city: '',
    state: '',
    country: null,
    sex: 'M',
    premium: true,
    summit: true,
    created_at: '2022-10-04T10:08:05Z',
    updated_at: '2024-01-20T16:00:03Z',
    badge_type_id: 1,
    weight: 58.2,
    profile_medium: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/1111/1111/2/medium.jpg',
    profile: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/1111/1111/2/large.jpg',
    friend: null,
    follower: null
  }

  // ============= CLUB MOCK DATA
  // real club data
  export const detailedClub : entity.IDetailedClub = {
      id: 1219949,
      resource_state: 3,
      name: 'HiPRO France',
      profile_medium: 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/1219949/30072295/1/medium.jpg',
      profile: 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/1219949/30072295/1/large.jpg',
      cover_photo: 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/1219949/30191159/1/large.jpg',
      cover_photo_small: 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/1219949/30191159/1/small.jpg',
      activity_types: [],
      activity_types_icon: 'sports_multi_normal',
      dimensions: [ 'moving_time', 'num_activities', 'distance', 'elev_gain' ],
      sport_type: 'other',
      localized_sport_type: 'Multisport',
      city: 'Paris',
      state: '',
      country: 'France',
      private: false,
      member_count: 2350,
      featured: false,
      verified: true,
      url: 'HiPRO-France',
      membership: 'member',
      admin: false,
      owner: false,
      description: 'Bienvenue sur le Club HiPRO France ! \r\n' +
        'Prêts à muscler votre entraînement* et votre nutrition ? 👟\r\n' +
        'https://www.instagram.com/hiprofrance/?hl=fr\r\n' +
        '\r\n' +
        '*HiPRO est riche en protéines. Les protéines contribuent au maintien et à l’augmentation de la masse musculaire.',
      club_type: 'casual_club',
      following_count: 0,
      website: 'https://hipro.danone.fr/'
  }

  export const clubMembers : entity.IClubAthlete[] = [
    {
      resource_state: 2,
      firstname: '# SR # Ramesh',
      lastname: 'T.',
      membership: 'member',
      admin: false,
      owner: false
    },
    {
      resource_state: 2,
      firstname: "'Luis Fernando Osorio",
      lastname: '&.',
      membership: 'member',
      admin: false,
      owner: false
    }
  ];

  const clubAdmins : entity.ISummaryAthlete[] =  [
    { resource_state: 2, firstname: 'Louis', lastname: 'R.' },
    { resource_state: 2, firstname: 'Bertrand', lastname: 'D.' },
    { resource_state: 2, firstname: 'Cécile', lastname: 'R.' },
    { resource_state: 2, firstname: 'Kali', lastname: 'I.' },
    { resource_state: 2, firstname: 'Zack', lastname: 'N.' }
  ];

  export const getLoggedInAthleteClubsMock : entity.ISummaryClub[] = [
    {
      id: 231407,
      resource_state: 2,
      name: 'The Strava Club',
      profile_medium: 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5319085/1/medium.jpg',
      profile: 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5319085/1/large.jpg',
      cover_photo: 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5098428/21/large.jpg',
      cover_photo_small: 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5098428/21/small.jpg',
      activity_types: [],
      activity_types_icon: 'sports_multi_normal',
      dimensions: [ 'moving_time', 'num_activities', 'distance', 'elev_gain' ],
      sport_type: 'other',
      localized_sport_type: 'Multisport',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      private: false,
      member_count: 5142272,
      featured: false,
      verified: true,
      url: 'strava'
    },
    {
      id: 85235,
      resource_state: 2,
      name: 'xxxxx',
      profile_medium: 'https://3hv.cloudfront.net/pictures/clubs/1/1/1/medium.jpg',
      profile: 'https://3hv.cloudfront.net/pictures/clubs/1/1/1/large.jpg',
      cover_photo: null,
      cover_photo_small: null,
      activity_types: [ 'Run', 'VirtualRun', 'Wheelchair' ],
      activity_types_icon: 'sports_run_normal',
      dimensions: [
        'distance',
        'num_activities',
        'best_activities_distance',
        'elev_gain',
        'moving_time',
        'velocity'
      ],
      sport_type: 'running',
      localized_sport_type: 'Running',
      city: '',
      state: '',
      country: 'USA',
      private: false,
      member_count: 1260000,
      featured: false,
      verified: false,
      url: 'xxxxx'
    }
  ];