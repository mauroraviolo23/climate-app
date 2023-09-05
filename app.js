require('dotenv').config();

const {
  readInput,
  inquirerMenu,
  pause,
  listPlaces,
} = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {
  const searches = new Searches();
  let option;

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        // Display message
        const searchInput = await readInput('Location: ');

        // Search places
        const places = await searches.location(searchInput);

        // Choose the place
        const selectedId = await listPlaces(places);

        const selectedPlace = places.find((place) => place.id === selectedId);

        // Find temperature data about the selected place
        const placeClimate = await searches.placeClimate(
          selectedPlace.lat,
          selectedPlace.lng
        );

        // Display information about the selected place
        console.clear();
        console.log('\nCity:', selectedPlace.name, '\n');
        console.log('Latitude:', selectedPlace.lat);
        console.log('Longitude:', selectedPlace.lng, '\n');
        console.log('Description:', placeClimate.description, '\n');
        console.log('Minimum temperature:', placeClimate.min);
        console.log('Maximum temperature:', placeClimate.max);
        console.log('Current temperature:', placeClimate.temp);

        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
