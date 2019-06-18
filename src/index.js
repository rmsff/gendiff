import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './buildAst';
import toString from './renderers';

function getData(directory) {
  const extName = path.extname(directory);
  const data = fs.readFileSync(directory, 'utf-8');
  return parse(data, extName);
}

export default function (firstConfig, secondConfig, outputType = 'diff') {
  const ast = buildAst(getData(firstConfig), getData(secondConfig));
  const result = toString(ast, outputType);
  return result;
}
