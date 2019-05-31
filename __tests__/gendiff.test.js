import getDiff from '../src/bin/gendiff';

const expected = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';

test.each([
  ['__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json'],
  ['__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml'],
  ['__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini'],
])(
  '.add(%s, %s)',
  (a, b) => {
    expect(getDiff(a, b)).toBe(expected);
  },
);
