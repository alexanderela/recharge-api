const fetchCafes = require('./apiHelper')

const formatStationData = async (stations) => {
	const stationPromises = stations.map(async station => {
		const {
			station_name,
			station_phone,
			latitude,
			longitude,
			street_address,
			city,
			state,
			zip,
			intersection_directions,
			access_days_time
		} = station

		return {
	    station_name,
	    station_phone,
	    latitude,
	    longitude,
	    street_address,
	    city,
	    state,
	    zip_code: zip,
	    intersection_directions,
	    access_days_time,
	    cafes: await fetchCafes(`${latitude},${longitude}`)
		}
	});
	return Promise.all(stationPromises);
};

const formatCafeData = (cafes) => {
	const cafePromises = cafes.map(cafe => {
		const {
			address,
			city,
			state,
			postalCode,
			crossStreet,
			formattedAddress,
			distance
		} = cafe.location

		return {
		  cafe_name: cafe.name,
      street_address: address,
      city,
      state,
      zip_code: postalCode,
      cross_street: crossStreet,
      formatted_address: `${formattedAddress[0]}, ${formattedAddress[1]}, ${formattedAddress[2]}`,
      distance_in_meters: distance
		}
	});

	return Promise.all(cafePromises);
};

const cafeCleanUp = queriedCafes => {
	return queriedCafes.reduce((uniqueCafes, cafe, index) => {
		if (index === 0) uniqueCafes.push(cafe)

		uniqueCafes.forEach(uCafe => {
			if (uCafe.formatted_address !== cafe.formatted_address) {
				uniqueCafes.push(cafe)
			}
		})

		return uniqueCafes
	}, [])
}

module.exports = { formatStationData, formatCafeData, cafeCleanUp }