import diffRenderAst from './diffRenderAst';
import plainRenderAst from './plainRenderAst';

export default function (ast, type) {
  const outputTypes = {
    plain: plainRenderAst,
    diff: diffRenderAst,
    json: arg => JSON.stringify(arg, null, 2),
  };
  return outputTypes[type](ast);
}
