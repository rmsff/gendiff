import diff from './diffRender';
import plain from './plainRender';

export default function (ast, type) {
  const outputTypes = {
    plain,
    diff,
    json: arg => JSON.stringify(arg, null, 2),
  };

  try {
    return outputTypes[type](ast);
  } catch {
    throw new Error(`gendiff unsupported output type '${type}'`);
  }
}
