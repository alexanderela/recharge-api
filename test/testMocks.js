const testStations = [
  {
    station_name: 'Station 1',
    station_phone: '303-330-0000',
    latitude: '12.23',
    longitude: '13.45',
    city: 'Denver',
    state: 'CO',
    street_address: '123 Main St.',
    zip_code: '80202',
    intersection_directions: 'Main and Sherman',
    access_days_time: '24/7/365'
  },
  {
    id: 1,
    station_name: 'Station 1',
    station_phone: '303-330-0000',
    latitude: '12.23',
    longitude: '13.45',
    city: 'Denver',
    state: 'CO',
    street_address: '123 Main St.',
    zip_code: '80202',
    intersection_directions: 'Main and Sherman',
    access_days_time: '24/7/365'
  }
]

const testMockStations = [
  {
    station_name: 'Test Station 1',
    station_phone: '303-330-0000',
    latitude: 12.23,
    longitude: 13.45,
    city: 'Denver',
    state: 'CO',
    street_address: '123 Main St.',
    zip_code: '80202',
    intersection_directions: 'Main and Sherman',
    access_days_time: '24/7/365'
  },
  {
    station_name: 'Test Station 2',
    station_phone: '303-330-1111',
    latitude: 15.23,
    longitude: 20.45,
    city: 'Denver',
    state: 'CO',
    street_address: '456 Main St.',
    zip_code: '80202',
    intersection_directions: 'Main and Grant',
    access_days_time: '9a-5p'
  }
]

const testMockErrorStations = [
  {
    station_phone: '303-330-0000',
    latitude: 12.23,
    longitude: 13.45,
    city: 'Denver',
    state: 'CO',
    street_address: '123 Main St.',
    intersection_directions: 'Main and Sherman',
    access_days_time: '24/7/365'
  },
  {
    station_name: 'Test Station 2',
    station_phone: '303-330-1111',
    latitude: 15.23,
    longitude: 20.45,
    city: 'Denver',
    state: 'CO',
    street_address: '456 Main St.',
    zip_code: '80202',
    intersection_directions: 'Main and Grant',
    access_days_time: '9a-5p'
  }
]

const testMockEditStations = [
  {
    station_name: 'Edit Test Station 1',
    station_phone: '303-330-0000',
    latitude: 12.23,
    longitude: 13.45,
    city: 'Denver',
    state: 'CO',
    street_address: '123 Main St.',
    zip_code: '80202',
    intersection_directions: 'Main and Sherman',
    access_days_time: '24/7/365'
  },
  {
    station_phone: '303-330-1111',
    latitude: 15.23,
    longitude: 20.45,
    city: 'Denver',
    state: 'CO',
    street_address: '456 Main St.',
    zip_code: '80202',
    intersection_directions: 'Main and Grant',
    access_days_time: '9a-5p'
  }
]

const testCafes = [
  {
    station_id: 2,
    cafe_name: 'Cafe 4',
    street_address: '109 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Florida Ave',
    formatted_address: '109 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    id: 1,
    station_id: 1,
    cafe_name: 'Cafe 1',
    street_address: '098 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Grant Ave',
    formatted_address: '098 Front St. Denver, CO 80202',
    distance_in_meters: 333
  }
]

const testMockCafes = [
  {
    station_id: 1,
    cafe_name: 'Test Cafe 1',
    street_address: '098 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Grant Ave',
    formatted_address: '098 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    station_id: 1,
    cafe_name: 'Test Cafe 2',
    street_address: '765 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Pennsylvania Ave',
    formatted_address: '765 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    station_id: 1,
    cafe_name: 'Test Cafe 3',
    street_address: '432 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Nebraska Ave',
    formatted_address: '432 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    station_id: 2,
    cafe_name: 'Test Cafe 4',
    street_address: '109 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Florida Ave',
    formatted_address: '109 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    station_id: 2,
    cafe_name: 'Test Cafe 5',
    street_address: '876 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Tennessee Ave',
    formatted_address: '876 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    station_id: 2,
    cafe_name: 'Test Cafe 6',
    street_address: '543 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'New Mexico Ave',
    formatted_address: '543 Front St. Denver, CO 80202',
    distance_in_meters: 333
  }
]

const testMockErrorCafes = [
  {
    cafe_name: 'Test Cafe 1',
    street_address: '098 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    formatted_address: '098 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    station_id: 2,
    cafe_name: 'Test Cafe 6',
    street_address: '543 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'New Mexico Ave',
    formatted_address: '543 Front St. Denver, CO 80202',
    distance_in_meters: 333
  }
]

const testMockEditCafes = [
  {
    station_id: 1,
    cafe_name: 'Edit Test Cafe 1',
    street_address: '098 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Grant Ave',
    formatted_address: '098 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    station_id: 1,
    street_address: '765 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Pennsylvania Ave',
    formatted_address: '765 Front St. Denver, CO 80202',
    distance_in_meters: 333
  }
]

module.exports = { testStations, testCafes, testMockCafes, testMockStations, testMockErrorStations, testMockEditStations, testMockErrorCafes, testMockEditCafes  }