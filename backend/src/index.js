
import dotenv from 'dotenv';
import algoliasearch from 'algoliasearch'; // Import Algolia client directly

dotenv.config();

// Log environment variables to ensure they are loaded correctly
// console.log('ALGOLIA_APP_ID:', process.env.ALGOLIA_APP_ID);
// console.log('ALGOLIA_API_KEY:', process.env.ALGOLIA_API_KEY);

// Initialize Algolia client
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = algoliaClient.initIndex('contacts');

// Export the initialized index for use in other files
export { index };

import connectDB from './db/index.js';
import { app } from './app.js';

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });


