import { Project } from "ts-morph";
import ConsoleSpinner from "../util/ConsoleSpinner";

function ProjectAsync(CWD: string): Promise<Project> {
    return new Promise((r) => r(new Project({ tsConfigFilePath: `${CWD}/tsconfig.json` })))
}

export default async function LoadProject(CWD: string): Promise<Project> {
    const spinner = new ConsoleSpinner(`loading new Project ${CWD}`)

    spinner.start()

    const project = await ProjectAsync(CWD)

    spinner.stop()

    console.log(`${CWD} loaded`)
    return project

}