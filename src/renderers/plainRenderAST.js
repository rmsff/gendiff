import lodash from 'lodash';

export default (ast) => {
  const getLine = (value, depth, type) => {
    const stringify = (arg) => {
      if (lodash.isObject(arg)) return '[complex value]';
      if (lodash.isString(arg)) return `'${arg}'`;
      return arg;
    };
    const local = depth.join('.');
    const line = {
      added: () => `Property '${local}' was added with value: ${stringify(value)}`,
      removed: () => `Property '${local}' was removed`,
      updated: () => `Property '${local}' was updated. From ${stringify(value.before)} to ${stringify(value.after)}`,
    };
    return line[type]();
  };

  const getResult = (nodes, local = []) => nodes.reduce((acc, node) => {
    const {
      key, children, value, type,
    } = node;
    if (type === 'current') return acc;
    return lodash.isObject(children)
      ? [...acc, getResult(children, [...local, key])]
      : [...acc, getLine(value, [...local, key], type)];
  }, []);

  return lodash.flatten(getResult(ast)).join('\n');
};
