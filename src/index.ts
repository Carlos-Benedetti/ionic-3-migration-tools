import 'dotenv/config'
import ion3 from './ionic3';
import { Navigate, Translate } from './Navigation';


(async () => {

    const ionic3Project = await ion3.Load()

    const result = Translate(Navigate(ionic3Project))

    console.log(result)

})()
