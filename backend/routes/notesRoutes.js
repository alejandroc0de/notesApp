import express, { json } from 'express'
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
        const nota = req.body.nota
        const title = req.body.title
        const notaObject = {
            title : title,
            nota : nota
        }
        const result = await dataAccess.insertOne("notas",notaObject)
        if(result.acknowledged){
            return res.status(201).json({message: "Note added properly"})
        }
    } catch (error) {
        return res.status(500).json({message: "Error adding the note to the DB",error:error})
    }
})

router.delete("/", async (req,res) => {
    try {
        const id = req.body.id
        const result = await dataAccess.deleteOne("notas",id)
        if(result.deletedCount>0){
            return res.status(200).json({message: "Note deleted"})
        }
    } catch (error) {
        console.log(error)
    }
})

router.put("/", async (req,res) => {
    try {
        const id = req.body.id
        const title = req.body.title
        const nota = req.body.nota
        const result = await dataAccess.updateOne("notas",id,nota)
        if(result.modifiedCount>0){
            return res.status(200).json({message:"Note Updated"})
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/findOne", async (req,res) => {
    try {
        const searchTerm = req.body.term
        console.log(searchTerm)
        console.log(typeof(searchTerm))
        const result = await dataAccess.findOne("notas",searchTerm)
        console.log(result)
        if(result){
            return res.status(200).json({Result : result})
        }else{
            console.log(result)
            return res.status(201).json({Result: 0, Code:201})
        }
    } catch (error) {
        res.status(400).json({message:"Error when finding data"})
        console.log(error)
    }
})

export default router