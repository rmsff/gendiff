import recursiveRenderAST from './recursiveRenderAST';
import plainRenderAST from './plainRenderAST';

export default function (AST, type) {
  return type === 'plain' ? plainRenderAST(AST) : recursiveRenderAST(AST);
}
