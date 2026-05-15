import express from 'express'
import findAll from '../services/notesService.js'
import dataAccess from '../services/notesService.js';
const router = express.Router();

router.get("/", async (req,res) => {
    try {
        const notes = await dataAccess.findAll("notas")
        res.send(notes)
    } catch (error) {
        console.log(error)
    }
})

export default router