import { ENV } from "../Project/types";

export const IONIC3_ENV:ENV = {
    defaults:{
        DEC_NAV:"node_modules/ionic-angular/umd/navigation/nav-controller.d.ts",
        DEC_APP:"node_modules/ionic-angular/umd/components/app/app.d.ts",
        DEC_COMP:"node_modules/@angular/core/src/metadata/directives.d.ts"
    },
    get CWD(): string {
        const { ION3_CWD } = process.env
        if (!ION3_CWD) {
            throw new Error("ION3_CWD not set");
        }
        return ION3_CWD
    },

    get DEC_NAV():string{
        return process.env.DEC_NAV || this.defaults.DEC_NAV
    },

    get DEC_APP():string{
        return process.env.DEC_APP || this.defaults.DEC_APP
    },

    get DEC_COMP():string{
        return process.env.DEC_COMP || this.defaults.DEC_COMP
    }
}
export default IONIC3_ENV