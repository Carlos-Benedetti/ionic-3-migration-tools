import {Node, SyntaxKind} from 'ts-morph'

export function Traversal(node:Node){
    node.forEachDescendant((node, traversal) => {
    switch (node.getKind()) {
      case SyntaxKind.ClassDeclaration:
        // skips traversal of the current node's descendants
        traversal.skip();
        break;
      case SyntaxKind.Parameter:
        // skips traversal of the current node's descendants and its siblings and all their descendants
        traversal.up();
        break;
      case SyntaxKind.FunctionDeclaration:
        // stops traversal completely
        traversal.stop();
        break;
      case SyntaxKind.InterfaceDeclaration:
        // stops traversal completely and returns this value
        return node;
    }
  
    return undefined;
  })
};