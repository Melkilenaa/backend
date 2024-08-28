import { Router } from 'express'
import { addNotes, deleteNote, getAllNotes, getOneNotes, updatenotes } from '../controller/notes.controller'

let notes_router = Router()

notes_router.post('/create-new', addNotes)
notes_router.get('/all', getAllNotes)
notes_router.put('/update/:id', updatenotes)
notes_router.get('/all/:id', getOneNotes)
notes_router.delete('/delete/:id', deleteNote)


export default notes_router;