import { Project } from "ts-morph";
import ionic3 from "../ionic3";

export function ListNgComp(project: Project) {

    const navCtrFile = project.getSourceFile(ionic3.Paths.Component)
    const AppFile = project.getSourceFile(ionic3.Paths.App)

    if (!navCtrFile) {
        throw new Error("NavControl devlaration Not found");
    }

    if (!AppFile) {
        throw new Error("App devlaration Not found");
    }

    const Component = navCtrFile.getInterface(ionic3.ClassNames.Component)

    if(!Component){
        throw new Error(`Fail to find interface declaration with name ${ionic3.ClassNames.Component}`);
    }

    for (const referencedSymbol of Component.findReferences()) {
        for (const reference of referencedSymbol.getReferences()) {

            if (reference.getSourceFile().getFilePath().includes('node_modules')) {
                continue
            }
            console.log(reference.getSourceFile().getClasses().map(c=>c.getName()).join(),reference.getSourceFile().getFilePath())
        }
    }



}