import diff from './diffRender';
import plain from './plainRender';

export default function (ast, type) {
  const outputTypes = {
    plain,
    diff,
    json: arg => JSON.stringify(arg, null, 2),
  };
  const result = outputTypes[type];
  if (result) return result(ast);
  throw new Error((`gendiff unsupported output type '${type}'`));
}
