#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index';
import { version, description } from '../../package.json';

const consoleOutput = (firstConfig, secondConfig) => {
  const result = genDiff(firstConfig, secondConfig, program.format);
  console.log(result);
};

program
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(consoleOutput)
  .description(description)
  .version(version)
  .parse(process.argv);
