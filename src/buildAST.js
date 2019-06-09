
import lodash from 'lodash';

const buildAST = (firstData, secondData) => {
  const keysFirst = Object.keys(firstData);
  const keysSecond = Object.keys(secondData);
  const commonKeys = lodash.uniq([...keysFirst, ...keysSecond]);

  const AST = commonKeys.reduce((acc, key) => {
    const hasKeyFirst = lodash.has(firstData, key);
    const hasKeySecond = lodash.has(secondData, key);
    const valueFirst = firstData[key];
    const valueSecond = secondData[key];
    const hasChildrenFirst = typeof valueFirst === 'object';
    const hasChildrenSecond = typeof valueSecond === 'object';

    if (hasKeyFirst && hasKeySecond) {
      if (hasChildrenFirst && hasChildrenSecond) {
        return { ...acc, [key]: { children: buildAST(valueFirst, valueSecond) } };
      }
      return valueFirst === valueSecond
        ? { ...acc, [key]: { value: valueFirst, status: 'current' } }
        : { ...acc, [key]: { value: { before: valueFirst, after: valueSecond }, status: 'update' } };
    }

    return !hasKeyFirst && hasKeySecond
      ? { ...acc, [key]: { value: valueSecond, status: 'add' } }
      : { ...acc, [key]: { value: valueFirst, status: 'remove' } };
  }, {});

  return AST;
};

export default buildAST;
