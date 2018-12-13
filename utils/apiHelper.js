const fetch = require('node-fetch');
const { stationKey, cafeId, cafeSecret } = require('../APIKeys/APIKeys.js');
const { formatStationData, formatCafeData } = require('./fetchDataCleaner');

const fetchData = async (url) => {
  const response = await fetch(url);
  const responseJson = await response.json();

  return responseJson;
};

const fetchStations = async (zipCode) => {
  const url = `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?access=public&status=E&fuel_type=ELEC&zip=${zipCode}&api_key=${stationKey}&format=JSON`;
  const stationData = await fetchData(url);
  const stationResults = await formatStationData(stationData.fuel_stations);

  return stationResults;
};

const fetchCafes = async (latitudeLongitude) => {
  const url = `https://api.foursquare.com/v2/venues/search?client_id=${cafeId}&client_secret=${cafeSecret}&v=20180323&limit=3&ll=${latitudeLongitude}&query=coffee'&radius=805`;
  const cafeData = await fetchData(url);
  const cafeResults = formatCafeData(cafeData.response.venues);

  return cafeResults;
};

module.exports = { fetchStations, fetchCafes };