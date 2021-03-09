#!/usr/bin/env node

import { start } from './index.js'
import { Command } from 'commander';
import pkg from 'inquirer';
const { prompt } = pkg;
const { Separator } = pkg;
import chalk from 'chalk'
import figlet from 'figlet'

const program = new Command();
var questions = [
  {
    type: 'checkbox',
    name: 'city',
    message: 'Select city: ',
    choices: [
      new Separator("== Cities =="),
      {
        name: "moscow"
      },
      {
        name: "spb"
      }
    ],

    validate: function (choice) {
      if (choice.length < 1 || choice.length >= 2) {
        return "You must choose one topic";
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'topic',
    message: 'Topic: ',
  },
  {
    type: 'input',
    name: 'pages',
    message: 'Pages: ',
  }
];
console.log(
  chalk.red(
    figlet.textSync('T + N = love', { horizontalLayout: 'full' })
  )
)

program
  .version('1.0.0')
  .command('parse')
  .alias('p')
  .description('Parse choosen city')
  .action(async () => {

    await prompt(questions)
      .then(async answers => {
        console.log(answers);
        await start(answers["city"][0], answers["topic"], answers["pages"]);
        console.log(
          chalk.green('Parsing done')
        );
      })
      .catch(error => {
        console.log(error);
      })
  })

program.parse(process.argv);