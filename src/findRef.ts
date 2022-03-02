import 'dotenv/config'
import { ClassDeclaration, Project, ReferenceEntry, CallExpression, ts, Node, PropertyDeclaration, ExpressionStatement, BinaryExpression, Type, SourceFile, QuoteKind, StructureKind, SyntaxKind } from "ts-morph";

const DEC_NAV = process.env.DEC_NAV || "node_modules/ionic-angular/umd/navigation/nav-controller.d.ts"
const DEC_APP = process.env.DEC_APP || "node_modules/ionic-angular/umd/components/app/app.d.ts"
const { ION3_CWD } = process.env

if(!ION3_CWD){
    throw new Error("ION3_CWD not set");
    
}

const paths = {
    decNavController:`${ION3_CWD}/${DEC_NAV}`,
    decApp:`${ION3_CWD}/${DEC_APP}`
}

const ENV = {
    NavController: "NavController",
    App: "App",
    CallExpression: "CallExpression"
}
const classIsPage = (c: ClassDeclaration): boolean => c.getName()?.includes('Page') || false
const classIsName = (c: ClassDeclaration, name: string): boolean => c.getName() === (name) || false
const parentCallIs = (parent: Node<ts.Node>, call: string): parent is CallExpression => parent.getKindName() === call || false

function getMethodNav(navCtr: ClassDeclaration, navigation: { [source: string]: { [method: string]: ({ path?: string; param?: string } | string)[] } } = {}) {
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

                const souceName = sourceClass.getName()!
                const methodName = method.getName()!

                const lineAndColumn = reference.getSourceFile().getLineAndColumnAtPos(reference.getTextSpan().getStart())
                const path = `${reference.getSourceFile().getFilePath()}:${lineAndColumn.line}:${lineAndColumn.column}`

                if (!navigation[methodName]) {
                    navigation[methodName] = {}
                }

                if (!navigation[methodName][souceName]) {
                    navigation[methodName][souceName] = []
                }
                if (!targetClass) {
                    navigation[methodName][souceName].push({ path })
                } else {
                    const targetName = targetClass.getName()
                    navigation[methodName][souceName].push(targetName)
                }



            }
        }
    }
    return navigation
}

const project = new Project({
    tsConfigFilePath: `${ION3_CWD}/tsconfig.json`,
});



const navCtrFile = project.getSourceFile(paths.decNavController)
const AppFile = project.getSourceFile(paths.decApp)

if (!navCtrFile) {
    throw new Error("NavControl devlaration Not found");
}


if (!AppFile) {
    throw new Error("App devlaration Not found");
}

const navCtr = navCtrFile.getClass(ENV.NavController)!
const App = AppFile.getClass(ENV.App)!

console.log(JSON.stringify(getMethodNav(navCtr)))
console.log(getMethodNav(App))