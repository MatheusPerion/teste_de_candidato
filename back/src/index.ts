import express,{Express, Request, Response} from "express"
import dotenv from 'dotenv'
import * as cors from 'cors'
import routes from './routes'

dotenv.config()
const app:Express = express ()
app.use(cors())

app.get( '/', (req: Request, res: Response) => {
    res.send('abrobrinha')
})

app.use(routes)

app.listen (process.env.PORT, () =>{console.log(`funcionando ${process.env.PORT}`)})