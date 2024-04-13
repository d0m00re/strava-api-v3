import { IDetailedSegment } from "../../src/entity/strava.entity";

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