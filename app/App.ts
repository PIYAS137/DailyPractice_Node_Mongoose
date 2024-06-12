import express,{NextFunction, Request,Response} from 'express'
import cors from 'cors'
import { middlewares } from './middlewares/customMid'
import router from './Router'
import Route_Not_Found from './errors/RouteNotFound'
import Global_Error_Handler from './errors/GlobalErrorHanlder'
export {middlewares} from './middlewares/customMid'


const app = express()

// mmiddlewares
app.use(express.json())
app.use(cors())


app.use('/api/v1',router)



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
app.use("*",Route_Not_Found)

// global Error handler 
app.use(Global_Error_Handler)


export default app;