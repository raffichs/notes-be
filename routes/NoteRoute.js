import express from "express";
import { getNote, createNote, updateNote, deleteNote } from "../controller/NoteController.js";

const router = express.Router();

router.get("/notes", getNote);
router.post("/create", createNote);
router.put("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);

export default router;