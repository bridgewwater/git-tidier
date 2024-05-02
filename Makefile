.PHONY: test check clean build dist all

# change base namespace
ROOT_NAME =git-tidier

ENV_ROOT ?=$(shell pwd)
ENV_MODULE_FOLDER ?=${ENV_ROOT}
ENV_MODULE_MAKE_FILE ?=${ENV_MODULE_FOLDER}/Makefile
ENV_MODULE_MANIFEST =${ENV_MODULE_FOLDER}/package.json
ENV_MODULE_CHANGELOG =${ENV_MODULE_FOLDER}/CHANGELOG.md
ENV_COVERAGE_OUT_FOLDER =${ENV_ROOT}/coverage/
ENV_NODE_MODULES_FOLDER =${ENV_ROOT}/node_modules/
ENV_NODE_MODULES_LOCK_FILE =${ENV_ROOT}/package-lock.json
ENV_ROOT_CHANGELOG_PATH?=CHANGELOG.md

all: env

env:
	@echo "== project env info start =="
	@echo ""
	@echo "ROOT_NAME                                 ${ROOT_NAME}"
	@echo "ENV_MODULE_FOLDER                         ${ENV_MODULE_FOLDER}"
	@echo "ENV_ROOT_CHANGELOG_PATH                   ${ENV_ROOT_CHANGELOG_PATH}"
	@echo ""
	@echo "test info"
	@echo "ENV_COVERAGE_OUT_FOLDER                   ${ENV_COVERAGE_OUT_FOLDER}"
	@echo "== project env info end =="
	@echo "most of node project need pnpm"
	pnpm --version
	@echo "pnpm registry is:"
	@pnpm config get registry

cleanCoverageOut:
	@$(RM) -r ${ENV_COVERAGE_OUT_FOLDER}
	$(info ~> has cleaned ${ENV_COVERAGE_OUT_FOLDER})

cleanNpmCache:
	@$(RM) -r ${ENV_NODE_MODULES_FOLDER}
	$(info ~> has cleaned ${ENV_NODE_MODULES_FOLDER})
	@$(RM) ${ENV_NODE_MODULES_LOCK_FILE}
	$(info ~> has cleaned ${ENV_NODE_MODULES_LOCK_FILE})

cleanAll: cleanCoverageOut cleanNpmCache
	@echo "=> clean all finish"


install:
	npm install

dep: install

depPrune:
	npm prune

lint:
	npm run lint

lintEslint:
	npm run lint:eslint

style:
	npm run format

styleCheck:
	npm run format:check

testCoverage: cleanCoverageOut
	npm run jest:collectCoverage

testCICoverage: cleanCoverageOut
	npm run jest:coverage

testAll:
	npm run test

buildIfPresent:
	npm run --if-present build

ci: styleCheck lint testAll buildIfPresent

helpProjectRoot:
	@echo "Help: Project root Makefile"
ifeq ($(OS),Windows_NT)
	@echo ""
	@echo "warning: other install make cli tools has bug"
	@echo " run will at make tools version 4.+"
	@echo "windows use this kit must install tools blow:"
	@echo "-> scoop install main/make"
	@echo ""
endif
	@echo "-- node module makefile root --"
	@echo " this project management by https://docs.npmjs.com/downloading-and-installing-node-js-and-npm"
	@echo "~> make env                                   - print env of this project"
	@echo "~> make dep                                   - install"
	@echo "~> make style                                 - run style check and auto fix"
	@echo "~> make lintEslint                            - run lint check and auto fix"
	@echo "~> make ci                                    - run ci"
	@echo " unit test as"
	@echo "~> make testCoverage                          - run full unit test and show coverage"
	@echo "~> make testCICoverage                        - run full unit test CI coverage"
	@echo "~> make testAll                               - run full unit test"

help: helpProjectRoot
	@echo ""
	@echo "-- more info see Makefile --"