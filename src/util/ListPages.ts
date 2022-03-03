process.env.XDG_CONFIG_HOME = "/home/benedetti/workspace/rodojacto/mobile"
import ionic3 from "../ionic3";
import { Project } from "ts-morph";
import { IsPage } from "./class.util";
import * as ionic from '@ionic/cli'
import { IonicPage } from "./PageCloning/IonicPage";

export default async function ListPages(project: Project):Promise<IonicPage[]> {
    
    const baseUrl = project.getCompilerOptions().baseUrl!

    if (!baseUrl) {
        throw new Error("baseUrl no set in tsconfig.json");
    }

    const pages:IonicPage[] = []
    for (const sourceFile of project.getSourceFiles()) {
        for (const classDeclaration of sourceFile.getClasses()) {
            if (IsPage(classDeclaration)) { 
                pages.push(new IonicPage(classDeclaration,project))
            }
        }
    }
    return pages
}