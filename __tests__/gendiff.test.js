import fs from 'fs';
import genDiff from '../src';

test.each([
  ['__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json'],
  ['__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml'],
  ['__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini'],
])(
  '.add(%s, %s)',
  (a, b) => {
    const expectedDiff = fs.readFileSync('__tests__/__fixtures__/expectedDiff.txt', 'utf-8');
    expect(genDiff(a, b, 'diff')).toBe(expectedDiff);

    const expectedPlain = fs.readFileSync('__tests__/__fixtures__/expectedPlain.txt', 'utf-8');
    expect(genDiff(a, b, 'plain')).toBe(expectedPlain);

    const expectedJson = fs.readFileSync('__tests__/__fixtures__/expectedJson.txt', 'utf-8');
    expect(genDiff(a, b, 'json')).toBe(expectedJson);
  },
);
