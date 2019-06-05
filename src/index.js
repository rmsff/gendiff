import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import buildAST from './buildAST';
import toString from './renderers/index';

function getFile(fileLocation) {
  const pathExtname = path.extname(fileLocation);
  const file = fs.readFileSync(fileLocation, 'utf-8');
  return parsers(file, pathExtname);
}

export default function (firstConfig, secondConfig, type) {
  const AST = buildAST(getFile(firstConfig), getFile(secondConfig));
  const result = toString(AST, type);

  return result;
}
