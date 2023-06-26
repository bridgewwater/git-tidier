#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const shell = require('shelljs');

const interact = require('../src/interact');
const monsterClear = require('../src/monster');
const regexpClear = require('../src/regexp');
const checkCwd = require('../src/check');

const app = require('../package.json');

if (!shell.which('git')) {
  shell.echo(chalk.red('Sorry, this script requires git'));
  shell.exit(1);
}

program.version(app.version, '-v, --version');

program.option('-f, --force', 'force to delete', false);
program.option('-r, --remote <remote>', 'the name of remote repo', 'origin');
program.option('-ig, --ignore <ignore...>', 'ignore branchs [ main ] is contains, if you want clean main just set -n 0');

program
  .command('check')
  .description('check current work directory')
  .option('-n, --number <number>', 'the number of safety branchs', 3)
  .action((opts) => {
    const {number} = opts;
    checkCwd({...program.opts(), number});
  });

program
  .command('clear')
  .description('clear git branch in current work directory')
  .option('-i, --interactive', 'clear git branch interactively', true)
  .option('-e, --execute', 'clear git branch by regexp')
  .option('-a, --all', 'clear all git branch but master')
  .option('-l, --local', 'just clear local branch', false)
  .option('-n, --number <number>', 'the number of safety branchs', 3)
  .option('-p, --pattern <pattern>', 'the pattern of match')
  .action((opts) => {
    const {interactive, all, execute, number, local, pattern} = opts;
    switch (true) {
    case execute:
      regexpClear({
        ...program.opts(),
        number,
        local,
        pattern
      }).then(r => console.log(chalk.green(`clear regexp: ${r}`)));
      break;
    case all:
      monsterClear({...program.opts(), number, local})
        .then(r => console.log(chalk.green(`clear ${r} branch`)));
      break;
    case interactive:
      interact({...program.opts(), number, local});
      break;
    default:
      interact({...program.opts(), number, local});
      break;
    }
  });

program.name('git-tidier').usage('[command] [options] ');
// eslint-disable-next-line no-undef
program.parse(process.argv);
