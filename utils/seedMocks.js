const mockCafes = [
  {
    cafe_name: 'Cafe 1',
    street_address: '098 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Grant Ave',
    formatted_address: '098 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    cafe_name: 'Cafe 2',
    street_address: '765 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Pennsylvania Ave',
    formatted_address: '765 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    cafe_name: 'Cafe 3',
    street_address: '432 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Nebraska Ave',
    formatted_address: '432 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
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
    cafe_name: 'Cafe 5',
    street_address: '876 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'Tennessee Ave',
    formatted_address: '876 Front St. Denver, CO 80202',
    distance_in_meters: 333
  },
  {
    cafe_name: 'Cafe 6',
    street_address: '543 Front St.',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    cross_street: 'New Mexico Ave',
    formatted_address: '543 Front St. Denver, CO 80202',
    distance_in_meters: 333
  }
];

const mockStations = [
  {
    station_name: 'Station 1',
    station_phone: '303-330-0000',
    latitude: 12.23,
    longitude: 13.45,
    city: 'Denver',
    state: 'CO',
    street_address: '123 Main St.',
    zip_code: '80202',
    intersection_directions: 'Main and Sherman',
    access_days_time: '24/7/365',
    ev_connector_type: null,
    ev_network: "SemaCharge Network",
    cafes: [mockCafes[0], mockCafes[1], mockCafes[2]]
  },
  {
    station_name: 'Station 2',
    station_phone: '303-330-1111',
    latitude: 15.23,
    longitude: 20.45,
    city: 'Denver',
    state: 'CO',
    street_address: '456 Main St.',
    zip_code: '80202',
    intersection_directions: 'Main and Grant',
    access_days_time: '9a-5p',
    ev_connector_type: ["CHADEMO", "J1772COMBO"],
    ev_network: "ChargePoint Network",
    cafes: [mockCafes[3], mockCafes[4], mockCafes[5]]
  }
];

module.exports = { mockCafes, mockStations };