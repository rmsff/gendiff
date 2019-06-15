import lodash from 'lodash';

export default (ast) => {
  const getIndent = depth => '  '.repeat(depth);

  const stringify = (value, depth) => (lodash.isObject(value)
    ? `{\n${Object.keys(value).map(key => `${getIndent(depth + 3)}${key}: ${value[key]}\n`)}${getIndent(depth + 1)}}` : value);

  const getLine = (key, value, depth, type) => {
    const line = {
      added: () => `+ ${key}: ${stringify(value, depth)}`,
      removed: () => `- ${key}: ${stringify(value, depth)}`,
      current: () => `  ${key}: ${stringify(value, depth)}`,
      updated: () => `- ${key}: ${stringify(value.before, depth)}\n${getIndent(depth)}+ ${key}: ${stringify(value.after, depth)}`,
    };
    return line[type]();
  };

  const getResult = (nodes, depth = 1) => nodes.map((node) => {
    const {
      key, children, value, type,
    } = node;
    return lodash.isObject(children)
      ? `${getIndent(depth + 1)}${key}: {\n${getResult(children, depth + 2).join('\n')}\n${getIndent(depth + 1)}}`
      : `${getIndent(depth)}${getLine(key, value, depth, type)}`;
  });

  return `{\n${(getResult(ast)).join('\n')}\n}`;
};
