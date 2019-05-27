#!/usr/bin/env node
const program = require('commander');

program
  .arguments('<firstConfig> <secondConfig>')
  // .action((firstConfig, secondConfig) => {
  //   firstConfigValue = firstConfig;
  //   secondConfigValue = secondConfig;
  // })
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
