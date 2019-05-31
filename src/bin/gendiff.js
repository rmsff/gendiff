#!/usr/bin/env node
import program from 'commander';
import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import parsers from '../parsers';

function getFile(fileLocation) {
  const pathExtname = path.extname(fileLocation);
  const file = fs.readFileSync(fileLocation);
  return parsers(file, pathExtname);
}

export default function getDiff(firstConfig, secondConfig) {
  const before = getFile(firstConfig);
  const after = getFile(secondConfig);
  const properties = lodash.uniq(Object.keys(before).concat(Object.keys(after)), el => el.id);

  const difference = properties.reduce((acc, key) => {
    const isPropertyBefore = lodash.has(before, key);
    const isPropertyAfter = lodash.has(after, key);

    if (isPropertyBefore && isPropertyAfter) {
      return before[key] === after[key] ? `${acc}    ${key}: ${after[key]}\n`
        : `${acc}  + ${key}: ${after[key]}\n  - ${key}: ${before[key]}\n`;
    }
    return isPropertyBefore ? `${acc}  - ${key}: ${before[key]}\n`
      : `${acc}  + ${key}: ${after[key]}\n`;
  }, '');

  console.log(`{\n${difference}}`);
  return `{\n${difference}}`;
}

program
  .arguments('<firstConfig> <secondConfig>')
  .action(getDiff)
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
