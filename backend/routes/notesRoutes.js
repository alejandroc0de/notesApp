import express from 'express'
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

router.post("/", async (req,res)=> {
    try {
        const note = req.body.note
        const title = req.body.title
        const id = req.body.title
        
    } catch (error) {
        
    }
})

export default router