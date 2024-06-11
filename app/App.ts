import express,{NextFunction, Request,Response} from 'express'
import cors from 'cors'
import { middlewares } from './middlewares/customMid'
import router from './Router'
export {middlewares} from './middlewares/customMid'


const app = express()

// mmiddlewares
app.use(express.json())
app.use(cors())


app.use('/api/vi',router)



app.get('/',middlewares.myMiddleware,(req:Request,res:Response,next:NextFunction)=>{
    try{
        res.status(200).json({
            success : true,
            message : "Sever is running !"
        })
    }catch(err){
        next(err);
    }
})

// route not found 

app.use("*",(req:Request,res:Response,next:NextFunction)=>{
    res.status(404).json({
        success : false,
        message : "Route not found !"
    })
})

// global Error handler 
app.use((error:any,req:Request,res:Response,next:NextFunction)=>{
    if(error){
        res.status(500).json({
            success : false,
            message : error.message || "There is an server side error !"
        })
    }
})


export default app;