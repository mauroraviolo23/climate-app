const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Look for a city`,
      },
      {
        value: 2,
        name: `${'2.'.green} View history`,
      },
      {
        value: 0,
        name: `${'0.'.gray} Quit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  // console.clear();
  console.log('================='.green);
  console.log('Choose an option:'.white);
  console.log('=================\n'.green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  const pauseQuestion = [
    {
      type: 'input',
      name: 'ENTER',
      message: `Press ${'ENTER'.green} to continue`,
    },
  ];
  console.log('\n');
  await inquirer.prompt(pauseQuestion);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'Enter the name of the city',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please insert a value';
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
};

const tasksListForDeletion = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const taskIndex = (i + 1).toString().concat('.').gray;
    return {
      value: task.id,
      name: `${taskIndex} ${task.description}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.red + ' Cancel'.red,
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirmDeletion = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'confirmation',
      message,
    },
  ];

  const { confirmation } = await inquirer.prompt(question);
  return confirmation;
};

const tasksListForCompletion = async (tasks = []) => {
  console.clear();
  const choices = tasks.map((task, i) => {
    const taskIndex = (i + 1).toString().concat('.').gray;
    return {
      value: task.id,
      name: `${taskIndex} ${task.description}`,
      checked: task.completedAt ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Mark as checked if complete',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  tasksListForDeletion,
  confirmDeletion,
  tasksListForCompletion,
};