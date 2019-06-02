import lodash from 'lodash';

const render = (ast) => {
  const getIndent = depth => '  '.repeat(depth);

  const stringify = (value, depth) => {
    if (typeof value === 'object') {
      const lines = Object.keys(value).map(key => `${getIndent(depth + 3)}${key}: ${value[key]}\n`);
      return `{\n${lines}${getIndent(depth + 1)}}`;
    }
    return value;
  };

  const getLine = (key, value, depth, status) => {
    const line = {
      add: () => `+ ${key}: ${stringify(value, depth)}`,
      remove: () => `- ${key}: ${stringify(value, depth)}`,
      current: () => `  ${key}: ${stringify(value, depth)}`,
      change: () => `- ${key}: ${stringify(value.before, depth)}\n${getIndent(depth)}+ ${key}: ${stringify(value.after, depth)}`,
    };
    return line[status]();
  };

  const getResult = (nodes, depth = 1) => Object.keys(nodes).map((key) => {
    const { children, value, status } = nodes[key];
    return children
      ? `${getIndent(depth + 1)}${key}: {\n${lodash.flatten(getResult(children, depth + 2)).join('\n')}\n${getIndent(depth + 1)}}`
      : `${getIndent(depth)}${getLine(key, value, depth, status)}`;
  });

  return (lodash.flatten(getResult(ast))).join('\n');
};

export default render;
