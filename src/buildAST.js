
import lodash from 'lodash';

const buildAST = (firstFile, secondFile) => {
  const keys = lodash.uniq(Object.keys(firstFile).concat(Object.keys(secondFile)), el => el.id);

  const AST = keys.reduce((acc, key) => {
    const hasKeyFirst = lodash.has(firstFile, key);
    const hasKeySecond = lodash.has(secondFile, key);
    const valueFirst = firstFile[key];
    const valueSecond = secondFile[key];
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
