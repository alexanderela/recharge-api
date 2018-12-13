const cafeCleanUp = queriedCafes => {
  return queriedCafes.reduce((uniqueCafes, cafe, index) => {
    if (index === 0) uniqueCafes.push(cafe);

    uniqueCafes.forEach(uCafe => {
      if (uCafe.formatted_address !== cafe.formatted_address) {
        uniqueCafes.push(cafe);
      }
    });

    return uniqueCafes;
  }, []);
};

module.exports = cafeCleanUp;
