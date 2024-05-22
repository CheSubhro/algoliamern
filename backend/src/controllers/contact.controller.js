

import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Contact } from '../models/contact.model.js'
import algoliasearch from 'algoliasearch';

const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const index = algoliaClient.initIndex('contacts');

const addContact = asyncHandler ( async (req,res) =>{

    try {
        const contact = new Contact(req.body);
        await contact.save();
    
        // Add contact to Algolia index
        await index.saveObject({
          objectID: contact._id.toString(),
          ...req.body,
        });
    
        res.status(201).json(contact);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

})

export {
    addContact
}




