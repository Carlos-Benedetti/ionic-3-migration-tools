import { Project } from "ts-morph";
import LoadProject from "../Project/LoadProject";
import IONIC3_ENV from "./env";

export default function Load():Promise<Project>{
    return LoadProject(IONIC3_ENV.CWD)
}