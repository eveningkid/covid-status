export default {
  BASE_URL: 'https://corona.lmao.ninja',

  fetchHistory(country) {
    return fetch(this.BASE_URL + '/v2/historical/' + country)
      .then(response => response.json())
      .then(response => {
        if (
          !response.timeline ||
          !response.timeline.cases ||
          !response.timeline.deaths
        ) {
          throw new Error(`Country "${country}" not found.`);
        }

        return {
          cases: Object.entries(response.timeline.cases),
          deaths: Object.entries(response.timeline.deaths)
        };
      });
  },

  fetchLocations() {
    return fetch(this.BASE_URL + '/countries')
      .then(response => response.json())
      .then(response => {
        return response
          .filter(location => {
            return (
              (location.countryInfo.iso2 !== null &&
                location.countryInfo.iso2 !== 'NO DATA') ||
              location.countryInfo.lat ||
              location.countryInfo.long
            );
          })
          .map(location => ({
            country: location.country,
            countryCode: location.countryInfo.iso2,
            coordinates: {
              latitude: location.countryInfo.lat,
              longitude: location.countryInfo.long
            },
            counts: {
              confirmed: location.cases,
              deaths: location.deaths,
              recovered: location.recovered,
              critical: location.critical
            },
            today: {
              cases: location.todayCases,
              deaths: location.todayDeaths
            },
            statsPerMillion: {
              cases: location.casesPerOneMillion,
              deaths: location.deathsPerOneMillion
            },
            flag: location.countryInfo.flag
          }));
      });
  }
};
