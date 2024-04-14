import { IDetailedSegment, IExplorerResponse, ISummarySegment } from "../../src/entity/strava.entity";

export const getSegmetnById : IDetailedSegment = {
    id: 1,
    resource_state: 3,
    name: 'Tournicoti',
    activity_type: 'Run',
    distance: 304.8,
    average_grade: 2,
    maximum_grade: 18.2,
    elevation_high: 41,
    elevation_low: 35,
    start_latlng: [ 4, 2 ],
    end_latlng: [ 4, 2 ],
    elevation_profile: '....',
    climb_category: 0,
    city: 'V',
    state: 'Î',
    country: 'Fr',
    private: false,
    hazardous: false,
    starred: false,
    created_at: '2017-01-23T15:34:45Z',
    updated_at: '2021-05-15T08:04:44Z',
    total_elevation_gain: 6,
    map: {
      id: 's',
      polyline: 'y',
      resource_state: 3
    },
    effort_count: 21,
    athlete_count: 1,
    star_count: 1,
    athlete_segment_stats: {
      pr_elapsed_time: 101,
      pr_date: '2024-03-27',
      pr_visibility: 'everyone',
      pr_activity_id: 11049506362,
      pr_activity_visibility: 'everyone',
      effort_count: 5
    },
    xoms: {
      kom: '47s',
      qom: '1:13',
      overall: '47s',
      destination: {
        href: 'strava://segments/1/leaderboard',
        type: 'overall',
        name: 'All-Time'
      }
    },
    local_legend: {
      athlete_id: 1,
      title: 'P',
      profile: '....',
      effort_description: '53 efforts in the last 90 days',
      effort_count: '53',
      effort_counts: { overall: '53 efforts', female: '12 efforts' },
      destination: 'strava://segments/1/local_legend?categories%5B%5D=overall'
    }
  }

  const exploreSegment : IExplorerResponse = {segments : [
    {
        id: 18849595,
        resource_state: 2,
        name: 'When in trouble, huck for a double!',
        climb_category: 0,
        climb_category_desc: 'NC',
        avg_grade: -14.6,
        start_latlng: [10.11,11],
        end_latlng: [11,11],
        elev_difference: 75.8,
        distance: 520.8,
        points: '_h}eFnfsjVb@Ph@HtAKb@Id@Qb@Kd@T^\\f@Jd@@d@Hf@Pd@TZ`@Pl@Ft@AXE`@?TDRFRX`@`AbANR',
        starred: false,
        elevation_profile: 'https://d3o5xota0a1fcr.cloudfront.net/v6/charts/R3YKESQ5U4FBGAR2L6QPDQYDK6TNOVRSRXLHHFA24DRQ5ZILKQIYLBPD7NJVOJQV2P35OFLLQH7SWMCBYSW26===',
        local_legend_enabled: true
      },
      {
        id: 17253267,
        resource_state: 2,
        name: 'Hawk Hill - Climb (Vista Point to circle)',
        climb_category: 0,
        climb_category_desc: 'NC',
        avg_grade: 3.1,
        start_latlng: [10.11,11],
        end_latlng: [11,11],
        elev_difference: 42.9,
        distance: 1389.9,
        points: 'at{eF~pqjV\\OJ@XJPVB\\@fAAfAGxABb@JXh@h@hAvAH\\?LENUj@k@bAILQJ_@DoBGm@Ds@?w@B[JkAv@cA\\_@Rc@\\]^Qb@OTOLWJSR[f@UXK\\?d@Hb@d@nAHf@EXEP]l@GNCN?\\BNN^l@`@LRJ`@Ab@CPKVW`@a@TYHg@RIFQRKREd@GpBSfBA`@',
        starred: false,
        elevation_profile: 'https://d3o5xota0a1fcr.cloudfront.net/v6/charts/TY3ZRNHD6Z7LGVZSTLPYWWMWXFXJN2AH2W5XQOUS6P2SBORQFBYFB4J5JOQK74PJEIC77VNTZGHO2QRK6A2A====',
        local_legend_enabled: true
      },
      {
        id: 6813956,
        resource_state: 2,
        name: 'T-split left to top',
        climb_category: 0,
        climb_category_desc: 'NC',
        avg_grade: 4.8,
        start_latlng: [10.11,11],
        end_latlng: [11,11],
        elev_difference: 20.6,
        distance: 379.2,
        points: '_n}eFvxrjVVDTAl@HV@DHCRIR?FBT`@j@FPJbAMjABZHf@Tf@ZZ\\L\\HtBS',
        starred: false,
        elevation_profile: 'https://d3o5xota0a1fcr.cloudfront.net/v6/charts/IS4W6YOEHT4KHOXUXQYNI3MFMPOJBHFI4B2IEBOKOS7K6WPIBS7WUKSN4A33MGWF7NCWB3PDPURXRDZLEMIA====',
        local_legend_enabled: true
      }
  ]}


  const segmentStarred : ISummarySegment[] = [
    {
      id: 1,
      resource_state: 2,
      name: 'Île Saint-Denis 1500m depuis le pont',
      activity_type: 'Run',
      distance: 1579.2,
      average_grade: 0.1,
      maximum_grade: 2.8,
      elevation_high: 31,
      elevation_low: 27,
      start_latlng: [ 8.9662, 2.582 ],
      end_latlng: [ 4.659, 2.3289 ],
      elevation_profile: null,
      climb_category: 0,
      city: "L'Île-Saint-Denis",
      state: 'Île-de-France',
      country: 'France',
      private: false,
      hazardous: false,
      starred: true,
      pr_time: 532,
      athlete_pr_effort: {
        id: 1,
        activity_id: 1,
        elapsed_time: 532,
        distance: 1579.2,
        start_date: '2023-09-10T18:07:31Z',
        start_date_local: '2023-09-10T20:07:31Z',
        is_kom: false
      },
      starred_date: '2023-07-24T00:20:02Z'
    },
    {
      id: 22729684,
      resource_state: 2,
      name: "Sprint jusqu'au pont A86",
      activity_type: 'Run',
      distance: 653.8,
      average_grade: 0.1,
      maximum_grade: 13.5,
      elevation_high: 14.2,
      elevation_low: 11.2,
      start_latlng: [ 48.931945, 2.340153 ],
      end_latlng: [ 48.926913, 2.335677 ],
      elevation_profile: null,
      climb_category: 0,
      city: "L'Île-Saint-Denis",
      state: 'Île-de-France',
      country: 'France',
      private: false,
      hazardous: false,
      starred: true,
      pr_time: 196,
      athlete_pr_effort: {
        id: 1,
        activity_id: 1,
        elapsed_time: 196,
        distance: 653.8,
        start_date: '2024-01-07T16:20:14Z',
        start_date_local: '2024-01-07T17:20:14Z',
        is_kom: false
      },
      starred_date: '2023-08-09T17:47:52Z'
    }
  ];

  const starSegment : IDetailedSegment = {
    id: 22729684,
    resource_state: 3,
    name: "Sprint jusqu'au pont A86",
    activity_type: 'Run',
    distance: 653.8,
    average_grade: 0.1,
    maximum_grade: 13.5,
    elevation_high: 14.2,
    elevation_low: 11.2,
    start_latlng: [ 48.931945, 2.340153 ],
    end_latlng: [ 48.926913, 2.335677 ],
    elevation_profile: null,
    climb_category: 0,
    city: "L'Île-Saint-Denis",
    state: 'Île-de-France',
    country: 'France',
    private: false,
    hazardous: false,
    starred: false,
    pr_time: 196,
    athlete_pr_effort: {
      id: 3179116706045502500,
      activity_id: 10513166237,
      elapsed_time: 196,
      distance: 653.8,
      start_date: '2024-01-07T16:20:14Z',
      start_date_local: '2024-01-07T17:20:14Z',
      is_kom: false
    },
    created_at: '2020-01-26T14:40:36Z',
    updated_at: '2021-05-19T08:05:13Z',
    total_elevation_gain: 5.2,
    map: {
      id: 's22729684',
      polyline: 's_tiH}`hMLD^ZRBp@VpAx@fA`AtAbAd@d@`@f@b@d@b@Td@p@RL^b@Xd@XTp@x@p@b@b@\\fAjAh@b@l@n@j@d@DFPL',
      resource_state: 3
    },
    effort_count: 11242,
    athlete_count: 1024,
    star_count: 3,
    athlete_segment_stats: {
      pr_elapsed_time: 196,
      pr_date: '2024-01-07',
      pr_visibility: 'everyone',
      pr_activity_id: 10513166237,
      pr_activity_visibility: 'everyone',
      effort_count: 64
    },
    xoms: {
      kom: '2:02',
      qom: '2:19',
      overall: '2:02',
      destination: {
        href: 'strava://segments/22729684/leaderboard',
        type: 'overall',
        name: 'All-Time'
      }
    },
    local_legend: {
      athlete_id: 2528937,
      title: 'Rob Pitkethly',
      profile: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/2528937/2438588/1/large.jpg',
      effort_description: '29 efforts in the last 90 days',
      effort_count: '29',
      effort_counts: { overall: '29 efforts', female: '15 efforts' },
      destination: 'strava://segments/22729684/local_legend?categories%5B%5D=overall'
    }
  }