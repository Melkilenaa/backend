import express, { NextFunction, Request, Response, json } from 'express'
import cors from 'cors'
import notes_router from './routers/notes'

const app = express()

app.use(json())
app.use(cors())

app.use('/notes', notes_router)

app.use((err:Error, req: Request, res:Response, next: NextFunction)=>{
    res.json({
        message:err.message
    })
})

let PORT = 2607

app.listen(2607, ()=>{
    console.log(`Server running on port ${PORT}`);
})
