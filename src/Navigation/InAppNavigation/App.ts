
import { Project } from "ts-morph";
import ionic3 from "../../ionic3";
import { getMethodNav } from "../getMethodNav";
import { NavigationResult } from "../NavigationResult";

export function App(project: Project): NavigationResult {

    
    const appFile = project.getSourceFile(ionic3.Paths.App)

    if (!appFile) {
        throw new Error("App file not found");
    }

    const app = appFile.getClass(ionic3.ClassNames.App)

    if(!app){
        throw new Error(`Fail to find class declaration with name ${ionic3.ClassNames.App}`);
        
    }

    return getMethodNav(app)


}