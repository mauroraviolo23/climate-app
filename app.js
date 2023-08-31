require('dotenv').config();

const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {
  const searches = new Searches();
  let option;

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        const place = await readInput('Location: ');
        const data = await searches.location(place);
        // display message
        // look for the place
        // select place
        // get climate data
        // display climate data for that city
        // console.log('City information'.white);
        console.log(data);
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
