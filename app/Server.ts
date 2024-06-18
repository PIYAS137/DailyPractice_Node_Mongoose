import mongoose from 'mongoose'
import app from './App'
import config from './config';
import {Server} from 'http'

let server : Server ;


async function main() {
    mongoose.connect(config.db_url as string)
    app.listen(config.port,()=>{
        console.log(`Server is running on http://localhost:${config.port}`);
    })
}

main()



process.on('unhandledRejection',()=>{
    console.log("unhandledRejection is detected ! Server is shutting down ! 😈");
    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
})

process.on('uncaughtException',()=>{
    console.log("uncaughtException is detected ! Server is shutting down ! 😈");
    process.exit(1);
})

