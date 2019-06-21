import lodash from 'lodash';

export default (ast) => {
  const getTab = depth => '  '.repeat(depth);

  const stringify = (value, depth) => (lodash.isObject(value)
    ? `{\n${Object.keys(value).map(key => `${getTab(depth + 3)}${key}: ${value[key]}\n`)}${getTab(depth + 1)}}` : value);

  const getLine = (node, depth, render) => {
    const {
      key, value, type, valueBefore, valueAfter, children,
    } = node;
    const line = {
      added: () => `+ ${key}: ${stringify(value, depth)}`,
      removed: () => `- ${key}: ${stringify(value, depth)}`,
      unchanged: () => `  ${key}: ${stringify(value, depth)}`,
      updated: () => [`- ${key}: ${stringify(valueBefore, depth)}`, `${getTab(depth)}+ ${key}: ${stringify(valueAfter, depth)}`].join('\n'),
      node: () => `  ${key}: {\n${render(children, depth + 2).join('\n')}\n${getTab(depth + 1)}}`,
    };
    return line[type]();
  };
  const renderNode = (nodes, depth = 1) => nodes
    .map((node) => {
      const tab = getTab(depth);
      const line = getLine(node, depth, renderNode);
      return `${tab}${line}`;
    });

  const result = lodash.flatten(renderNode(ast)).join('\n');
  return `{\n${result}\n}`;
};
