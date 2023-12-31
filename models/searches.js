const fs = require('fs');

const axios = require('axios');

class Searches {
  record = [];
  dbPath = './database/database.json';

  constructor() {
    this.readDB();
  }

  get capitalizedRecord() {
    let capitalizedRecord = this.record.map((place) =>
      place
        .split(' ')
        .map((word) =>
          word[0].toUpperCase().concat(word.substring(1, word.length))
        )
        .join(' ')
    );
    return capitalizedRecord;
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'en',
    };
  }

  async location(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const response = await instance.get();

      return response.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async placeClimate(lat, lng) {
    try {
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather?',
        params: {
          ...this.paramsOpenWeather,
          lat,
          lon: lng,
        },
      });

      const response = await instance.get();
      const { weather, main } = response.data;

      let data = {
        description: weather[0].description,
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max,
        feels_like: main.feels_like,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  addRecord(location = '') {
    if (this.record.includes(location.toLowerCase())) return;

    this.record = this.record.splice(0, 4);

    this.record.unshift(location.toLowerCase());

    this.saveDB();
  }

  saveDB() {
    const payload = {
      record: this.record,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const fileInfo = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });

    const data = JSON.parse(fileInfo);

    this.record = data.record;
  }
}

module.exports = Searches;
