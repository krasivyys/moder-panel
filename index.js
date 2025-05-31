import express from 'express'
import router from './router.js'
import cookieParser from 'cookie-parser'

const PORT = 3001

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

async function startApp(){
    try{
        app.listen(PORT, '0.0.0.0', () => {console.log(`Starting server on ${PORT}`)})
    } catch (e){
        console.log(e)
    }
}

startApp();
