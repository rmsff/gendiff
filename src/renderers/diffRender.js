import lodash from 'lodash';

export default (ast) => {
  const tab = depth => '  '.repeat(depth);

  const stringify = (value, depth) => (lodash.isObject(value)
    ? `{\n${Object.keys(value).map(key => `${tab(depth + 3)}${key}: ${value[key]}\n`)}${tab(depth + 1)}}` : value);

  const getLine = (node, depth, render) => {
    const {
      key, value, type, valueBefore, valueAfter, children,
    } = node;
    const line = {
      added: () => [`+ ${key}: ${stringify(value, depth)}`],
      removed: () => [`- ${key}: ${stringify(value, depth)}`],
      current: () => [`  ${key}: ${stringify(value, depth)}`],
      updated: () => [`- ${key}: ${stringify(valueBefore, depth)}`, `${tab(depth)}+ ${key}: ${stringify(valueAfter, depth)}`],
      node: () => [`  ${key}: {\n${render(children, depth + 2).join('\n')}\n${tab(depth + 1)}}`],
    };
    return line[type]();
  };
  const renderNode = (nodes, depth = 1) => nodes.map(node => `${tab(depth)}${getLine(node, depth, renderNode).join('\n')}`);

  const result = lodash.flatten(renderNode(ast)).join('\n');
  return `{\n${result}\n}`;
};
