import mssql from "mssql";
import { v4 } from "uuid";
import lodash from "lodash";
import { Notes } from "../interfaces/notes";
import { config } from "../config/sqlConfig";
import Connection from "../dbhelpers/dbhelper";
import prisma from "../dbhelpers/prisma";

export class NotesServices {
  async createNotes(notes: Notes) {
    let result = await prisma.stickynotes.create({
      data:{
        id: v4(),
        title: notes.title,
        content: notes.content,
        createdAt: new Date(),
      },
    });
     
    if (result) {
      return {
        message: "Note created successfully",
      };
    } else {
      return {
        error: "Unable to create this note: Try Agaain",
      }
    }
  }
  async updateNotes(notes: Notes) {
    try {
      const noteExists = await prisma.stickynotes.findUnique({
        where: { id: notes.id }, 
      });

      if (lodash.isEmpty(noteExists)) {
        return {
          error: "Note not found",
        };
      }

      const updatedNote = await prisma.stickynotes.update({
        where: { id: notes.id }, 
        data: {
          title: notes.title,
          content: notes.content,
          createdAt: new Date(), 
        },
      });

      if (!updatedNote) {
        return {
          error: "Unable to update",
        };
      } else {
        return {
          message: "Note updated successfully",
        };
      }
    } catch (error) {
      return {
        error: "Try again, The action was unsuccessful",
      };
    }
  }

  async fetchAllNotes() {
    try {
      const response = await prisma.stickynotes.findMany()

      return { data: response };
    } catch (error) {
      return {
        error: "You are experiencing an error",
      };
    }
  }
  async fetchone(id: string) {
    try {
      // Ensure the Prisma client is connected
      let response = await prisma.stickynotes.findUnique({
        where: { id:id}
      });
  
      if (!response) {
        return {
          message: "Note doesn't exist",
        };
      } else {
        return { data: response };
        
      }
    } catch (error) {
      console.error("Error fetching note:", error);
      return {
        error: "You are experiencing an error",
      };
    }
  }
  async deleteNote(id: string) {
    try {
      
      const note = await prisma.stickynotes.findUnique({
        where: { id }, 
      });

      if (!note) {
        return {
          error: "Note not found",
        };
      }
      await prisma.stickynotes.delete({
        where: { id }, 
      });

      return {
        message: "Note deleted successfully",
      };
    } catch (error) {
      console.error(error); 
      return {
        error: "Try Again, Action unsuccessful",
      };
    }
  }
}