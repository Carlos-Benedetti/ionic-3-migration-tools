import { NavigationResult } from "../NavigationResult";

function getParamsOnly(target: (string | { path?: string | undefined; param?: string | undefined; })[]): string[] {
    return target.map(child => typeof child === 'string' ? child : child.param!);
}

export function Translate(nav: NavigationResult) {
    type newResult = {
        [page: string]: {
            children: string[];
            level: string[];
        };
    };

    const newMap: newResult = {}
    for (const [parent, methods] of Object.entries(nav)) {

        newMap[parent] = { children: [], level: [] }

        for (const [method, target] of Object.entries(methods)) {

            switch (method) {
                case 'push':
                    const children: string[] = getParamsOnly(target)
                    newMap[parent].children = new Array(...new Set(children))
                    break;
                default:
                    const parents: string[] = getParamsOnly(target)
                    newMap[parent].level = new Array(...new Set(parents))
                    break;
            }

        }
    }
    return newMap
}

