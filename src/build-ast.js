
import lodash from 'lodash';

const nodeTypes = [
  {
    check: (first, second, key) => !lodash.has(first, key) && lodash.has(second, key),
    make: (first, second, key) => ({ key, value: second[key], type: 'added' }),
  },
  {
    check: (first, second, key) => lodash.has(first, key) && !lodash.has(second, key),
    make: (first, second, key) => ({ key, value: first[key], type: 'removed' }),
  },
  {
    check: (first, second, key) => lodash.isObject(first[key]) && lodash.isObject(second[key]),
    make: (first, second, key, func) => ({ key, type: 'node', children: func(first[key], second[key]) }),
  },
  {
    check: (first, second, key) => first[key] === second[key],
    make: (first, second, key) => ({ key, value: first[key], type: 'notUpdated' }),
  },
  {
    check: (first, second, key) => first[key] !== second[key],
    make: (first, second, key) => ({
      key, valueBefore: first[key], valueAfter: second[key], type: 'updated',
    }),
  },
];

const buildAst = (firstData, secondData) => {
  const keysFirst = Object.keys(firstData);
  const keysSecond = Object.keys(secondData);
  const commonKeys = lodash.uniq(lodash.concat(keysFirst, keysSecond)).sort();

  const ast = commonKeys.map((key) => {
    const { make } = lodash.find(nodeTypes, item => item.check(firstData, secondData, key));
    return make(firstData, secondData, key, buildAst);
  });

  return ast;
};

export default buildAst;
