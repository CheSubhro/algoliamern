

import { Router } from "express";
import { addContact,listContact,updateContact,deleteContact } from "../controllers/contact.controller.js";

const router = Router()

router.route("/contacts").post(addContact)
router.route("/contacts").get(listContact)
router.route("/contacts/:id").put(updateContact)
router.route("/contacts/:id").delete(deleteContact)

export default router
