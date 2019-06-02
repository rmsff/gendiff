#!/usr/bin/env node
import program from 'commander';
import fs from 'fs';
import path from 'path';
import parsers from '../parsers';
import getAST from '../AST';
import toString from '../AST-render';

function getFile(fileLocation) {
  const pathExtname = path.extname(fileLocation);
  const file = fs.readFileSync(fileLocation, 'utf-8');
  return parsers(file, pathExtname);
}

export default function getDiff(firstConfig, secondConfig) {
  const AST = getAST(getFile(firstConfig), getFile(secondConfig));
  const result = toString(AST);

  console.log(`{\n${result}\n}`);
  return `{\n${result}\n}`;
}

program
  .arguments('<firstConfig> <secondConfig>')
  .action(getDiff)
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
