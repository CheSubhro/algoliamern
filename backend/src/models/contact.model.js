
import mongoose, { Schema } from "mongoose";

// Define the schema for the Contact
const contactSchema = new Schema(
    {
        // Name field
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        // Email field
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        // Phone No field
        phone: {
            type: String,
            required: true,
            trim: true,
            index: true
        }
    },
    // Additional options
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);

// Create and export the Contact model
export const Contact = mongoose.model("Contact", contactSchema);
