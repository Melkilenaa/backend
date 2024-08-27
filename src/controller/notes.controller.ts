import{ Request, Response } from "express";
import { NotesServices } from "../services/notes.services";

let noteservice = new NotesServices ()


let addNotes = async(req:Request, res:Response) => {
    try {

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
        let notes = await noteservice.fetchAllNotes()

        return res.status(201).json(
            notes
        )
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export async function updatenotes(req:Request, res:Response){
    try {
        let id = req.params.id

        let {title, content, created_at} = req.body

        let Notes ={
            id:id,
            title,
            content,
            created_at
        }

        let response = await noteservice.updateNotes(Notes);
      
        return res.json(response)
        

    } catch (error) {
        return res.json({
            error: error
        })
    }
}
export async function getOneNotes(req:Request, res:Response){
    try {
        let {id} = req.params

        let response = await noteservice.fetchone(id)

        return res.status(201).json(response)

    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export async function deleteNote(req:Request, res:Response){
    try {
        let id = req.params.id

        let response = await noteservice.deleteNote(id)

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