import diffRenderAst from './diffRender';
import plainRenderAst from './plainRender';

export default function (ast, type) {
  const outputTypes = {
    plain: plainRenderAst,
    diff: diffRenderAst,
    json: arg => JSON.stringify(arg, null, 2),
  };
  return outputTypes[type](ast);
}
