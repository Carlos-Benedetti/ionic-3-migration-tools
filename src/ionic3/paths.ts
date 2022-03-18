import { Paths } from "../Project/types"
import IONIC3_ENV from "./env"



export const IONIC3_PATHS:Paths ={
    
    get tsConfig():string{
        return `${IONIC3_ENV.CWD}/tsconfig.json`
    },
    get NavControler():string{
        return `${IONIC3_ENV.CWD}/${IONIC3_ENV.DEC_NAV}`
    },
    get App():string{
        return `${IONIC3_ENV.CWD}/${IONIC3_ENV.DEC_NAV}`
    },
    get Component():string{
        return `${IONIC3_ENV.CWD}/${IONIC3_ENV.DEC_COMP}`
    }
}

export default IONIC3_PATHS