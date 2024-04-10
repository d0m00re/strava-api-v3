import * as entity from "./../src/entity/strava.entity";

const detailedAthlete : entity.IDetailedAthlete = {
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

  // real club data
  const detailedClub : entity.IDetailedClub = {
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

  export {
    detailedAthlete,
    detailedClub
  }