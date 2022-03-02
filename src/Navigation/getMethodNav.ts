import { CallExpression, ClassDeclaration, SyntaxKind } from "ts-morph"
import { NavigationResult } from "./NavigationResult"

export function getMethodNav(navCtr: ClassDeclaration, navigation: NavigationResult = {}) {
    const methods = navCtr.getMethods()
    for (const method of methods) {
        for (const referencedSymbol of method.findReferences()) {
            for (const reference of referencedSymbol.getReferences()) {

                if (reference.getSourceFile().getFilePath().includes('node_modules')) {
                    continue
                }

                const functionCall = reference.getNode().getParent()!.getParent() as CallExpression
                const sourceClass = functionCall.getAncestors().find(a => a.asKind(SyntaxKind.ClassDeclaration)) as ClassDeclaration
                const targetClass = functionCall.getArguments()[0]?.getSymbol()!



                if (!sourceClass) {
                    throw new Error("Fail to get Source Call");
                }
                if (!targetClass) {
                    continue
                }

                const souceName = sourceClass.getName()!
                const methodName = method.getName()!

                const lineAndColumn = reference.getSourceFile().getLineAndColumnAtPos(reference.getTextSpan().getStart())
                const path = `${reference.getSourceFile().getFilePath()}:${lineAndColumn.line}:${lineAndColumn.column}`

                if (!navigation[souceName]) {
                    navigation[souceName] = {}
                }

                if (!navigation[souceName][methodName]) {
                    navigation[souceName][methodName] = []
                }

                const targetName = targetClass.getName()
                if (targetName === 'component') {
                    continue
                }

                navigation[souceName][methodName].push(targetName)

            }
        }
    }
    return navigation
}