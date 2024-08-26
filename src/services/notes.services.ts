import mssql from 'mssql'
import {v4} from 'uuid'
import lodash from 'lodash'
import { Notes } from '../interfaces/notes'
import { config } from '../config/sqlConfig'
import Connection from '../dbhelpers/dbhelper'


export class NotesServices{


    async createNotes(notes:Notes){
        let result = (await Connection.execute("createnote",{
                note_id: v4(),
                title: notes.title,
                content: notes.content,
                created_at: new Date().getTime().toString()
            })).rowsAffected
    
        if (result[0]= 1) {
            return{
              message:"Note created successfully"
            }
        }else {
        return{
            error: "Unable to create this note: Try Agaain"
        }
    
    }
    }

    async updateNotes(note_id:string, notes: Notes){
        try {
            let pool = await mssql.connect(config);
            let nooteExists=(await pool.request().execute("selectOne")).recordset
        

            if(lodash.isEmpty(nooteExists)){
                return {
                    error: "Organization not found"
                }
            }else{
                let result =(await Connection.execute("updatenote",{
                    note_id:v4(),
                    title:notes.title,
                    content:notes.content,
                    created_at: new Date().getTime().toString()})).rowsAffected
        
                    if (result[0]<1){
                        return{
                            error:"Unable to update"
                        }
        
                    }else{
                        return{
                            message:"Note updated successfully"
                        }
                    }
            }
            
        } catch (error) {
            
            return{
                error:"Try again, The action was unsuccessful"
            }
        }
        
    }


    async fetchAllNotes(){
        try {
            let pool = await mssql.connect(config);
            let response = (await pool.request().execute("fetchallNotes")).recordset;
            
                return{data:response}
        } catch (error) {
            return{
                error:"You are experiencing an error"
            }
        }
    }

    async fetchone(note_id:string){
        try {
            let pool = await mssql.connect(config);
            let response =(await pool.request().execute("selectOne")).recordset
            if (response.length<1) {
                return{
                    message:"Note doesnt exist"
                }
            } else {
                return{
                    data:response[0]
                }
            }
        } catch (error) {
            return{
                error:"Try again"
            }
        }
    }
    async deleteNote(note_id:string){
        let pool = await mssql.connect(config)
        let response = (await pool.request().execute("selectOne")).recordset
        try{
        if(response.length < 1){
            return {
                error: "Note not found"
            }
        }else{
            await pool.request().execute("deletenotes")
            return {
                message: "Note deleted successfully"
            }
        }
    }catch(error){
        return{
            error:"Try Again, Action unsuccessful"
        }
        
    }
    }
}