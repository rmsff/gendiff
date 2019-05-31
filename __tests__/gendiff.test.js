import getDiff from '../src/bin/gendiff';

const result = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';
test('getDiff', () => {
  expect(getDiff('before.json', 'after.json')).toBe(result);
});

test('getDiff', () => {
  expect(getDiff('before.yml', 'after.yml')).toBe(result);
});
