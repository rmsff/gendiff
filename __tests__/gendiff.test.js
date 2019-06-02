import getDiff from '../src/bin/gendiff';

const expected = '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';

const expected2 = '{\n    common: {\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: {\n            key: value\n        }\n        setting6: {\n            key: value\n          + ops: vops\n        }\n      + follow: false\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n    }\n  + group3: {\n        fee: 100500\n    }\n}';

const location = '__tests__/__fixtures__/';

test.each([
  [`${location}before.json`, `${location}after.json`],
  [`${location}before.yml`, `${location}after.yml`],
  [`${location}before.ini`, `${location}after.ini`],
])(
  '.add(%s, %s)',
  (a, b) => {
    expect(getDiff(a, b)).toBe(expected);
  },
);

test.each([
  [`${location}beforeCurrying.json`, `${location}afterCurrying.json`],
  [`${location}beforeCurrying.yml`, `${location}afterCurrying.yml`],
  [`${location}beforeCurrying.ini`, `${location}afterCurrying.ini`],
])(
  '.add(%s, %s)',
  (a, b) => {
    expect(getDiff(a, b)).toBe(expected2);
  },
);
