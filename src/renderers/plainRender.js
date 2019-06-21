import lodash from 'lodash';

export default (ast) => {
  const getLine = (node, depth, render) => {
    const {
      key, value, type, valueBefore, valueAfter, children,
    } = node;

    const stringify = (arg) => {
      const typesDispatcher = { string: `'${arg}'`, object: '[complex value]' };
      return typesDispatcher[typeof arg] || arg;
    };

    const local = lodash.concat(depth, key).join('.');
    const line = {
      added: () => `Property '${local}' was added with value: ${stringify(value)}`,
      removed: () => `Property '${local}' was removed`,
      updated: () => `Property '${local}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
      node: () => render(children, local),
    };
    return line[type]();
  };

  const getResult = (nodes, local = []) => nodes
    .filter(({ type }) => type !== 'unchanged')
    .map(node => getLine(node, local, getResult));

  return lodash.flatten(getResult(ast)).join('\n');
};
