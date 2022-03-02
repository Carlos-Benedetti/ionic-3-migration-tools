import { Project } from "ts-morph";
import ion3 from "@ionic3";
import { getMethodNav } from "../getMethodNav";
import { NavigationResult } from "../NavigationResult";

export function Navigate(project: Project): NavigationResult {

    const navCtrFile = project.getSourceFile(ion3.Paths.NavControler)
    const AppFile = project.getSourceFile(ion3.Paths.App)

    if (!navCtrFile) {
        throw new Error("NavControl devlaration Not found");
    }


    if (!AppFile) {
        throw new Error("App devlaration Not found");
    }

    const navCtr = navCtrFile.getClass(ion3.ClassNames.NavController)

    if(!navCtr){
        throw new Error(`Fail to find class declaration with name ${ion3.ClassNames.NavController}`);
        
    }

    return getMethodNav(navCtr)

}