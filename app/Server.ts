import mongoose from 'mongoose'
import app from './App'
import config from './config';
import {Server} from 'http'
import { seedSuperUser } from './DB';

let server : Server ;


async function main() {
    mongoose.connect(config.db_url as string);
    
    // when the db is totally virgin !
    seedSuperUser();

    server = app.listen(config.port,()=>{
        console.log(`Server is running on http://localhost:${config.port}`);
    })
}

main()

// for asynchronus errors 
process.on('unhandledRejection',()=>{
    console.log("unhandledRejection is detected ! Server is shutting down ! 😈");
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
})

// for synchronus errors 
process.on('uncaughtException',()=>{
    console.log("uncaughtException is detected ! Server is shutting down ! 😈");
    process.exit(1);
})
