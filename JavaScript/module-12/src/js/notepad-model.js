import { resolve } from "path";
import { reject } from "q";

export default class Notepad {
    constructor(notes) {
      this._notes = notes;
    }
  
    get notes() {
      return this._notes;
    };
  
    findNoteById(id) {
      return this.notes.find(note => note.id === id);
    };
  
    saveNote(note) {
      return new Promise ((resolve,reject) => {
        setTimeout(() => {
          this._notes.push(note);
          const jsonNotes = JSON.stringify(this._notes);
          localStorage.setItem('notes', jsonNotes);
          resolve(note);
        }, 1000);
      })
    };
  
    deleteNote(id) {
      return new Promise ((resolve, reject) => {
        setTimeout (() => {
          this._notes.find(x => x.id === id ? this._notes.splice(this._notes.indexOf(x), 1): null);
          console.log(this._notes);
          const jsonNotes = JSON.stringify(this._notes);
          localStorage.setItem('notes', jsonNotes);
          resolve(this._notes);
        }, 1000)
      })
    };
    
    updateNoteContent(id, updatedContent) {
       this._notes.map(x => {
        if (x.id === id) {
          Object.assign(x, updatedContent);
          return this
        }
      });
    };
  
    updateNotePriority(id, priority) {
      this._notes.map(key => key.id === id ? key.priority = priority : null);
    };
  
    filterNotesByQuery(query) {
      const arr = [];
      return new Promise ((resolve,reject) => {
        this._notes.filter(key => key.title.toLowerCase().includes(query) || key.title.toLowerCase().includes(query) ? arr.push(key) : null);
        resolve(arr)
      } )
      
    };
  
    filterNotesByPriority(priority) {
      const arr = [];

      this._notes.filter(x => x.priority === priority ? arr.push(x) : none);
      return arr
    };
}