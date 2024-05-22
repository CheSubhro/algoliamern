import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import HttpStatus from '../utils/HttpStatus.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Contact } from '../models/contact.model.js';
import { index } from '../index.js'

// Add contacts
const addContact = asyncHandler(async (req, res, next) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();

        // Add contact to Algolia index
        await index.saveObject({
            objectID: contact._id.toString(),
            ...req.body,
        });

        res.status(HttpStatus.CREATED).json(new ApiResponse(HttpStatus.CREATED, "Contact added successfully", contact));
    } catch (error) {
        next(new ApiError(HttpStatus.BAD_REQUEST, error.message));
    }
});

// List contacts
const listContact = asyncHandler(async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, "Contacts listed successfully", contacts));
    } catch (error) {
        next(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
    }
});

// Update contact
const updateContact = asyncHandler(async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Update contact in Algolia index
        await index.partialUpdateObject({
            objectID: req.params.id,
            ...req.body,
        });

        res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, "Contact updated successfully", contact));
    } catch (error) {
        next(new ApiError(HttpStatus.BAD_REQUEST, error.message));
    }
});

// Delete contact
const deleteContact = asyncHandler(async (req, res, next) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);

        if (!deletedContact) {
            return next(new ApiError(HttpStatus.NOT_FOUND, "Contact not found"));
        }

        // Delete contact from Algolia index
        await index.deleteObject(req.params.id);

        res.status(HttpStatus.NO_CONTENT).json(new ApiResponse(HttpStatus.NO_CONTENT, "Contact deleted successfully"));
    } catch (error) {
        next(new ApiError(HttpStatus.BAD_REQUEST, error.message));
    }
});

export { addContact,listContact,updateContact,deleteContact };
