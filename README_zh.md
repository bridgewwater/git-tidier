# git-tidier

git-tidier 是清理git分支的命令行工具.

[![node-ci](https://github.com/bridgewwater/git-tidier/workflows/node-ci/badge.svg?branch=main)](https://github.com/bridgewwater/git-tidier/actions/workflows/node-ci.yml)
[![NPM Version](http://img.shields.io/npm/v/git-tidier.svg?style=flat)](https://www.npmjs.org/package/git-tidier)
[![NPM Downloads](https://img.shields.io/npm/dm/git-tidier.svg?style=flat)](https://npmcharts.com/compare/git-tidier?minimal=true)
[![codecov](https://codecov.io/gh/bridgewwater/git-tidier/branch/main/graph/badge.svg)](https://codecov.io/gh/bridgewwater/git-tidier)

## Features

- 多种模式支持：交互式模式、自定义正则匹配模式和 all in 模式
- 默认保护最近使用分支和 main 分支，检查工作目录是否需要清理

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/contributor%20covenant-v1.4-ff69b4.svg)](.github/CONTRIBUTING_DOC/CODE_OF_CONDUCT.md)
[![GitHub contributors](https://img.shields.io/github/contributors/bridgewwater/template-golang-lib)](https://github.com/bridgewwater/template-golang-lib/graphs/contributors)

欢迎社区对该项目的贡献

请阅读 [贡献者指南](.github/CONTRIBUTING_DOC/CONTRIBUTING.md) 获取有关如何开始的信息.

## 用法

### 安装

```bash
# 全局安装
$ npm install -g git-tidier
# 获取帮助
$ git-tidier --help
$ git-tidier --version
# 卸载
$ npm uninstall -g git-tidier
```

### 使用前

注意：`删除分支是一件很危险的事`，请确保当前仓库工作已经完成，仔细核对 prompt 的信息

良好的开发习惯是

- 任何分支都 clean
- 每次切换分支前，不要有遗留提交，或者 stash ，防止遗忘

如何判断分支是否活跃 ?

```bash
$ git branch --sort=committerdate
```

### check

检查当前 git 是否需要清理

```bash
$ git-tidier check

# 保护最近活跃度 3条 分支
$ git-tidier check -n 3
```

### clear

- 为了尽可能保证不误删分支，git-tidier 默认会忽略 main 分支 和当前分支以及最近活跃的 3 条分支 （可通过配置覆盖默认行为）
- git-tidier 默认会删除本地分支和远程 origin 对应的远程分支
- 如果拿不稳删除可以设置为  `git-tidier clear -n 5` 在保留最近 5 条分支的前提下是不是需要清除

#### 交互模式

```bash
$ git-tidier clear
# 或者
$ git-tidier clean -i
```

#### 命令模式

```bash
# 仅删除本地分支，默认情况下会删除远程同名分支
$ git-tidier clear -l

# 删除, 除保护分支外的所有分支
$ git-tidier clear -a

# 强制删除
$ git-tidier clear -f

# 正则匹配模式 支持js正则表达式自定义检索分支
# 删除所有以 FE- 开头的分支
$ git-tidier clear -e -p '/FE-.*/'
# 正则匹配模式 也会保护 main 分支，如果想删除所有设置为
$ git-tidier clear -e -p '/FE-.*/' -n 0
```

- 清理配置

```bash
# 修改远程仓库 ori（默认远程仓库 origin）
$ git-tidier clear -r ori

# 清理时忽略 dev, develop 分支
$ git-tidier clear -ig dev develop

# 保护分支数量为 5 条, 默认为 3 条
$ git-tidier clear -n 5
```