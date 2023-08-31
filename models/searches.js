const axios = require('axios');

class Searches {
  record = ['City', 'Other city', 'Another city'];

  constructor() {}

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  async location(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const response = await instance.get();
      return response.data;
      // const response = await axios.get('https://reqres.in/api/users?page=2');
      // console.log(response);
    } catch (error) {}

    return []; // return matching places
  }
}

module.exports = Searches;
