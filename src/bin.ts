#!/usr/bin/env node

import ionic3 from "./ionic3"
import ListPages from "./util/ListPages"
import path from 'path'
import { ListNgComp } from "./ng-comp"
const [a, b, ...args] = process.argv

const inArgs = (opts: string[]): boolean => {

    const sArgs = args.join(' ');
    return !!opts.find(opt=>sArgs.includes(opt));

}

const listPages = async () => {

    const ionic3Project = await ionic3.Load()
    return ListPages(ionic3Project)

}

const listComponents = async () => {

    const ionic3Project = await ionic3.Load()
    return ListNgComp(ionic3Project)

}

process.env.ION3_CWD = path.resolve(args[0])

switch (true) {
    case inArgs(['-cp','--create-pages']):

        listPages().then(async pages => {

            const updateLog = pages.map((v) => v.pageName)

            function log() {
                process.stdout.write("\u001b[3J\u001b[2J\u001b[1J"); console.clear();
                process.stdout.write(updateLog.join('\n'))
            }

            log()
            for (const [index, page] of pages.entries()) {

                const P = ["\\", "|", "/", "-"];
                let x = 0;
                const spinnerInt = setInterval(() => {
                    updateLog[index] = (`${page.pageName} ${P[x++]}`);
                    log()
                    x &= 3;
                }, 250);

                const status = await page.generate()
                clearInterval(spinnerInt);
                if (status) {
                    updateLog[index] = `${page.pageName} \x1b[32m ✔️ \x1b[0m`;
                } else {
                    updateLog[index] = `${page.pageName} ❌ \x1b[0m`;
                }
                log()
            }
            log()
        })
        break;
    case inArgs(['-ls', '--list']):
        listComponents().then()
        break

    default:
        console.log(`
        Ion-Migrate

        args:

            -cp --create-pages : Creates new pages on the new application base on the components with "Page" (and without "Modal") in the name
            -ls --list

        `)
        break;
}