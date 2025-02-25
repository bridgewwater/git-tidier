const chalk = require('chalk');
const getGitBranchs = require('../src/utils/git/gitBranchTools').getGitBranchs;
const pruneLocalRemote = require('../src/utils/git/gitBranchTools').pruneLocalRemote;

module.exports = function (config = {}) {
  const { number, ignore, protection } = config;
  const branchs = getGitBranchs(protection, ignore || []);
  if (branchs.length <= Number(number)) {
    console.log(chalk.green('Ooo~ Your git is clean!'));
    pruneLocalRemote(config.remote);
  } else {
    console.log(chalk.white(`Something need to clear, run ${chalk.green('nt clear [options]')} can help!`));
  }
};
