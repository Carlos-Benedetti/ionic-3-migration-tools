import { Project } from "ts-morph";
import ConsoleSpinner from "../util/ConsoleSpinner";
import { Worker } from 'worker_threads';

function ProjectAsync(CWD: string): Promise<Project> {
    return new Promise((r) => r(new Project({ tsConfigFilePath: `${CWD}/tsconfig.json` })))
}

export default async function LoadProject(CWD: string): Promise<Project> {
    console.clear();
    console.log(`loading new Project ${CWD}`)

    const project = await ProjectAsync(CWD)
    console.clear()
    console.log(`${CWD} loaded \x1b[32m ✔️ \x1b[0m`)

    return project

}