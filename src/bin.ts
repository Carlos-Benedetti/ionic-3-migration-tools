#!/usr/bin/env node

import ionic3 from "./ionic3"
import { Navigate, Translate } from "./Navigation"
import ListPages from "./util/ListPages"
import path from 'path'
const [a, b, ...args] = process.argv
const listPages = async () => {

    const ionic3Project = await ionic3.Load()
    return ListPages(ionic3Project)

}

process.env.ION3_CWD = path.resolve(args[0])

switch (true) {
    case args.includes('create-pages'):

        listPages().then(async pages => {

            const updateLog = pages.map((v) => v.pageName)

            function log() {
                process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");console.clear();
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

                await page.generate()
                clearInterval(spinnerInt);
                updateLog[index] = `${page.pageName} \x1b[32m ✔️ \x1b[0m`;
                log()
            }
            log()
        })
        break;

    default:
        break;
}