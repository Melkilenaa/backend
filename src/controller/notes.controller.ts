import{ Request, Response } from "express";
import { NotesServices } from "../services/notes.services";

let noteservice = new NotesServices ()


let addNotes = async(req:Request, res:Response) => {
    try {
        let {title, content} = req.body


        let response = await noteservice.createNotes(req.body)

        console.log(response);
        

        return res.json(response)
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}
let getAllNotes = async (req:Request, res:Response)=>{
    try {
        let organizations = await noteservice.fetchAllNotes()

        return res.status(201).json(
            organizations
        )
    } catch (error) {
        return res.json({
            error: error
        })
    }
}
export async function getOneNotes(req:Request, res:Response){
    try {
        let {note_id} = req.params

        let response = await noteservice.fetchone(note_id)

        return res.status(201).json(response)

    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export async function deleteNote(req:Request, res:Response){
    try {
        let note_id = req.params.note_id

        let response = await noteservice.deleteNote(note_id)

        return res.json(response)
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export async function updatenotes(req:Request, res:Response){
    try {
        let notes_id = req.params.note_id

        let {title, content, created_at} = req.body

        let Notes ={
            note_id:notes_id,
            title,
            content,
            created_at
        }

        let response = await noteservice.updateNotes(notes_id, Notes);
      
        return res.json(response)
        

    } catch (error) {
        return res.json({
            error: error
        })
    }
}
export{
    addNotes,
    getAllNotes
}