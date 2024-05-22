

import { Router } from "express";
import { addContact,listContact,updateContact } from "../controllers/contact.controller.js";

const router = Router()

router.route("/contacts").post(addContact)
router.route("/contacts").get(listContact)
router.route("/contacts/:id").put(updateContact)

export default router
