import diffRenderAST from './diffRenderAST';
import plainRenderAST from './plainRenderAST';

export default function (AST, type) {
  const types = {
    get plain() {
      return plainRenderAST(AST);
    },
    get diff() {
      return diffRenderAST(AST);
    },
    get json() {
      return JSON.stringify(AST);
    },
  };
  return types[type];
}
