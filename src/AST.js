
import lodash from 'lodash';

const getAST = (firstFile, secondFile) => {
  const keys = lodash.uniq([...Object.keys(firstFile), ...(Object.keys(secondFile))], el => el.id);

  const AST = keys.reduce((acc, key) => {
    const isKeyFirst = lodash.has(firstFile, key);
    const isKeySecond = lodash.has(secondFile, key);
    const valueFirst = firstFile[key];
    const valueSecond = secondFile[key];
    const isChildrenFirst = typeof valueFirst === 'object';
    const isChildrenSecond = typeof valueSecond === 'object';

    if (isKeyFirst && isKeySecond) {
      if (isChildrenFirst && isChildrenSecond) {
        return { ...acc, [key]: { children: getAST(valueFirst, valueSecond) } };
      }
      return valueFirst === valueSecond
        ? { ...acc, [key]: { value: valueFirst, status: 'current' } }
        : { ...acc, [key]: { value: { before: valueFirst, after: valueSecond }, status: 'change' } };
    }

    return !isKeyFirst && isKeySecond
      ? { ...acc, [key]: { value: valueSecond, status: 'add' } }
      : { ...acc, [key]: { value: valueFirst, status: 'remove' } };
  }, {});

  return AST;
};

export default getAST;
