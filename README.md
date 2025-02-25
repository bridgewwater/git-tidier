# git-tidier

git-tidier is a tool for cleaning up git branches.

[![ci](https://github.com/bridgewwater/git-tidier/actions/workflows/ci.yml/badge.svg)](https://github.com/bridgewwater/git-tidier/actions/workflows/ci.yml)
[![NPM Version](http://img.shields.io/npm/v/git-tidier.svg?style=flat)](https://www.npmjs.org/package/git-tidier)
[![NPM Downloads](https://img.shields.io/npm/dm/git-tidier.svg?style=flat)](https://npmcharts.com/compare/git-tidier?minimal=true)
[![codecov](https://codecov.io/gh/bridgewwater/git-tidier/branch/main/graph/badge.svg)](https://codecov.io/gh/bridgewwater/git-tidier)

- 中文文档 [README_zh](https://github.com/bridgewwater/git-tidier/blob/main/README_zh.md)

## Features

- Multiple modes supported: interactive mode, custom regular matching mode, and all in mode
- By default, the recently used branch and the main branch are protected. Check whether the working directory needs to be cleaned up.
- try to clear the local remote branch ( support v1.2.+)

## usage

### Install

```bash
$ npm install -g git-tidier
# help
$ git-tidier --help
$ git-tidier --version
# uninstall
$ npm uninstall -g git-tidier
```

### Before Use

Note: `Deleting a branch is a very dangerous thing`, please ensure that the current warehouse work has been completed, carefully check the prompt information

good development habits are

- any branch remains `clean`
- Before switching branches each time, do not have legacy commits or stash to prevent forgetting.

How do I check if a branch is active?

```bash
$ git branch --sort=committerdate
```

### check

check if current git needs cleanup

```bash
$ git-tidier check

# protect the nearest activity 3 branches
$ git-tidier check -n 3
```

### clear

- To ensure that branches are not deleted by mistake as much as possible, the git-tidier ignores the main branch, the current branch, and the three most recently active branches by default (the default behavior can be overridden by configuration)
- git-tidier deletes the local branch and the remote branch corresponding to the remote origin by default
- If the deletion is unstable, it can be set to `git-tidier clear -n 5` . Do you need to clear it on the premise of keeping the latest 5 branches?

#### InteractionMode

```bash
$ git-tidier clear
# or
$ git-tidier clean -i
```

#### CommandMode

```bash
# Delete local branches only, remote branches with the same name are deleted by default
$ git-tidier clear -l

# delete all branches except the protection branch
$ git-tidier clear -a

# force delete. If there are unmerged commits in this branch, they will also be deleted successfully.
$ git-tidier clear -f

# Regular matching pattern support js regular expression custom search branch
# Delete all branches starting with FE-
$ git-tidier clear -e -p '/FE-.*/'
# The regular matching pattern also protects the main branch if you want to remove all set -n 0
$ git-tidier clear -e -p '/FE-.*/' -n 0
```

- clean configuration

```bash
# Modify the remote name ori (the default remote name origin)
$ git-tidier clear -r ori

# ignore dev when cleaning develop branch
$ git-tidier clear -ig dev develop

# The number of protected branches is 5, and the default number is 3.
$ git-tidier clear -n 5
```

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/contributor%20covenant-v1.4-ff69b4.svg)](.github/CONTRIBUTING_DOC/CODE_OF_CONDUCT.md)
[![GitHub contributors](https://img.shields.io/github/contributors/bridgewwater/git-tidier)](https://github.com/bridgewwater/git-tidier/graphs/contributors)

We welcome community contributions to this project.

Please read [Contributor Guide](.github/CONTRIBUTING_DOC/CONTRIBUTING.md) for more information on how to get started.

请阅读有关 [贡献者指南](.github/CONTRIBUTING_DOC/zh-CN/CONTRIBUTING.md) 以获取更多如何入门的信息
