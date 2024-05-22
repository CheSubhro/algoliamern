
import dotenv from 'dotenv'

dotenv.config();

import connectDB from './db/index.js'
import {app} from './app.js'

// console.log('ALGOLIA_APP_ID:', process.env.ALGOLIA_APP_ID);
// console.log('ALGOLIA_API_KEY:', process.env.ALGOLIA_API_KEY);

connectDB().then (() =>{

    app.listen(process.env.PORT || 8000, () => {

        console.log(`⚙️ Server is running at port : ${process.env.PORT}`)

    })
}).catch((err) => {

        console.log("MONGO db connection failed !!! ", err);
})

