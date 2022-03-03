import * as ionic from '@ionic/cli'
import { ClassDeclaration, ConstructorDeclarationStructure, Project } from 'ts-morph'
export class IonicPage {
    public pageName: string;
    protected filePathArray: string[];
    protected formatedPageName: string;

    protected get formatedPageFileName(): string {
        return `${this.formatedPageName}.page.ts`
    }
    protected get fullPath(): string {
        return `${this.filePathArray.join('/')}/${this.pageName}`
    }
    constructor(protected  classDeclaration: ClassDeclaration, protected project: Project) {

        const baseUrl = project.getCompilerOptions().baseUrl!
        const fullPageName = classDeclaration.getName()!;
        this.pageName = fullPageName.substring(0, fullPageName.length - 4);

        const fullFilePath = classDeclaration.getSourceFile().getFilePath();
        this.filePathArray = fullFilePath.substring(baseUrl.length).split('/');




        // removes de actual file name from the path
        this.filePathArray.pop()
        this.formatedPageName = this.filePathArray.pop()!
    }

    public async generate():Promise<boolean> {
        try {
            await this.generatePage();
            return true
        } catch (error) {
            return false
        }
    }

    protected async generatePage(): Promise<void> {
        const logBackup = globalThis.console.log

        globalThis.console.log = ()=>{}
        try {
            await new Promise(r => setTimeout(r, 1000))
            // const pargv = ['generate', 'page', this.fullPath]

            // const executor = await ionic.loadExecutor(await ionic.generateContext(), pargv)
            // const location = await executor.locate(pargv)
            // await executor.execute(location, process.env)
        }catch(error){
            throw new Error('fail to create page');
            
        }
        finally{
            globalThis.console.log = logBackup
        }
    }
    

}