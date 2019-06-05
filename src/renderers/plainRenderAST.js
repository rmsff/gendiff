import lodash from 'lodash';

export default (ast) => {
  const getLine = (value, depth, status) => {
    const stringify = (arg) => {
      if (typeof arg === 'object') return '[complex value]';
      if (typeof arg === 'string') return `'${arg}'`;
      return arg;
    };
    const local = depth.join('.');
    const line = {
      add: () => `Property '${local}' was added with value: ${stringify(value)}`,
      remove: () => `Property '${local}' was removed`,
      update: () => `Property '${local}' was updated. From ${stringify(value.before)} to ${stringify(value.after)}`,
    };

    return line[status]();
  };

  const getResult = (nodes, local = []) => Object.keys(nodes).reduce((acc, key) => {
    const { children, value, status } = nodes[key];

    if (status === 'current') return acc;
    return children
      ? [...acc, getResult(children, [...local, key])]
      : [...acc, getLine(value, [...local, key], status)];
  }, []);

  return lodash.flatten(getResult(ast)).join('\n');
};
