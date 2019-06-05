import fs from 'fs';
import genDiff from '../src/index';

const location = '__tests__/__fixtures__/';
const expectedRecursive = fs.readFileSync(`${location}expectedRecursive.txt`, 'utf-8');
const expectedPlain = fs.readFileSync(`${location}expectedPlain.txt`, 'utf-8');

test.each([
  [`${location}before.json`, `${location}after.json`],
  [`${location}before.yml`, `${location}after.yml`],
  [`${location}before.ini`, `${location}after.ini`],
])(
  '.add(%s, %s)',
  (a, b) => {
    expect(genDiff(a, b, 'recursive')).toBe(expectedRecursive);
    expect(genDiff(a, b, 'plain')).toBe(expectedPlain);
  },
);
