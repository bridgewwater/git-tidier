const shell = require('shelljs');
const chalk = require('chalk');

const getGitBranchText = () => {
  const { stdout } = shell.exec('git branch --sort=committerdate', {
    silent: true,
  });
  return stdout;
};

// get current branchs
// skip default is main
exports.getGitBranchs = (protection = 'main', ignores = []) => {
  const text = getGitBranchText();
  const branchs = [];
  const map = {};
  if (protection === '') {
    protection = 'main';
  }
  // skip main default
  const skips = [protection].concat(ignores);
  text.split('\n').forEach((b, i) => {
    const sb = b.trim();
    // skip ignore branchs in config and current branch
    if (sb && skips.indexOf(sb) === -1 && !sb.startsWith('*')) {
      map[`branch${i}`] = sb;
      branchs.push(`branch${i}`);
    }
  });
  branchs.map = map;
  return branchs;
};

// easy to test
const genDelLocalCommand = (branch, isForce = false) => {
  return `git branch ${isForce ? '-D' : '-d'} ${branch}`;
};

const pruneLocalRemoteCommand = (remote) => {
  return `git remote prune ${remote}`;
};

const genDelRemoteCommand = (branch, remote = 'origin') => {
  return `git push --delete ${remote} ${branch}`;
};

const getRegExp = (str) => {
  const regs = str.split('/');
  if (!regs[1]) return '';
  if (regs[1] && regs[2]) return new RegExp(regs[1], regs[2]);
  return new RegExp(regs[1]);
};

// clear local branch
exports.deleteLocalBranchItem = (branch, isForce) => {
  console.log(chalk.green(`=> try to delete the local branch: ${chalk.cyan(branch)} ing...`));
  shell.exec(genDelLocalCommand(branch, isForce));
};

// clear remote branch
exports.deleteRemoteBranchItem = (branch, remote) => {
  console.log(chalk.green(`=> try to delete the remote branch: ${chalk.cyan(`${remote}/${branch}`)} ing...`));
  shell.exec(genDelRemoteCommand(branch, remote));
};

exports.pruneLocalRemote = (remote = 'origin') => {
  console.log(chalk.green(`=> try to prune local branch remote: ${chalk.cyan(`${remote}`)} ing...`));
  shell.exec(pruneLocalRemoteCommand(remote));
};

exports.getRegExp = getRegExp;
exports.getGitBranchText = getGitBranchText;
exports.genDelLocalCommand = genDelLocalCommand;
exports.genDelRemoteCommand = genDelRemoteCommand;
