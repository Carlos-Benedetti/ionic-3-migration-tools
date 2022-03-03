import * as ionic from '@ionic/cli'
import { ClassDeclaration, ConstructorDeclarationStructure, Project } from 'ts-morph'
import { IonicPage } from './IonicPage';
export class IonicModal extends IonicPage {
    public async generate(): Promise<boolean> {
        try {
            await this.generateModule();
            await this.generateModal();
            return true
        } catch (error) {
            return false
        }
    }
    protected async generateModule(): Promise<void> {
        const logBackup = globalThis.console.log

        globalThis.console.log = ()=>{}
        try {
            await new Promise(r => setTimeout(r, 1000))
            const pargv = ['generate', 'module', this.fullPath]
            const executor = await ionic.loadExecutor(await ionic.generateContext(), pargv)
            const location = await executor.locate(pargv)
            await executor.execute(location, process.env)
        }catch(error){
            throw new Error('fail to create page');
            
        }
        finally{
            globalThis.console.log = logBackup
        }
    }
    protected async generateModal(): Promise<void> {
        const logBackup = globalThis.console.log

        globalThis.console.log = ()=>{}
        try {
            await new Promise(r => setTimeout(r, 1000))
            const pargv = ['generate', 'component', this.fullPath , `--module=${this.formatedPageName}.module.ts`]
            const executor = await ionic.loadExecutor(await ionic.generateContext(), pargv)
            const location = await executor.locate(pargv)
            await executor.execute(location, process.env)
        }catch(error){
            throw new Error('fail to create page');
            
        }
        finally{
            globalThis.console.log = logBackup
        }
    }
    

}