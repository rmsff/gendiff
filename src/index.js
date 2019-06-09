import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAST from './buildAST';
import toString from './renderers/index';

function getFile(location) {
  const extName = path.extname(location);
  const data = fs.readFileSync(location, 'utf-8');
  return parse(data, extName);
}

export default function (firstConfig, secondConfig, type) {
  const AST = buildAST(getFile(firstConfig), getFile(secondConfig));
  const result = toString(AST, type);
  return result;
}
