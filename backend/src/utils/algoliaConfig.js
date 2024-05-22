
import algoliasearch from 'algoliasearch';

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;

console.log('ALGOLIA_APP_ID1:', ALGOLIA_APP_ID);
console.log('ALGOLIA_API_KEY1:',ALGOLIA_API_KEY);

const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = algoliaClient.initIndex('contacts');

export { index };
