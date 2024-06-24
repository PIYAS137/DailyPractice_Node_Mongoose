import express,{NextFunction, Request,Response} from 'express'
import cors from 'cors'
import router from './Router'
import Route_Not_Found from './errors/RouteNotFound'
import Global_Error_Handler from './errors/GlobalErrorHanlder'
import cookieParser from 'cookie-parser'



const app = express()

// mmiddlewares
app.use(express.json())
app.use(cors({
    origin : ['http://localhost:3000']
}))
app.use(cookieParser())


app.use('/api/v1',router)



app.get('/',(req:Request,res:Response,next:NextFunction)=>{
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
app.use("*",Route_Not_Found)

// global Error handler 
app.use(Global_Error_Handler)


export default app;