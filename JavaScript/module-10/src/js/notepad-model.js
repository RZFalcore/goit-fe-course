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
  
      this._notes.push(note);
      return note;
    };
  
    deleteNote(id) {
  
      this._notes.find(x => {
        if (this._notes[x].id === id) {
          this._notes.splice(x, 1);
        //   break;
        }
      });
    };
    updateNoteContent(id, updatedContent) {
  
      this._notes.map(x => {
        if (x.id === id) {
          Object.assign(x, updatedContent);
        //   break;
        }
      });
  
    };
  
    updateNotePriority(id, priority) {
      this._notes.map(key => key.id === id ? key.priority = priority : null);
    };
  
    filterNotesByQuery(query) {
  
      const arr = [];
  
      this._notes.map(key => key.title.toLowerCase().includes(query) || key.title.toLowerCase().includes(query) ? arr.push(key) : null);
      return arr
    };
  
    filterNotesByPriority(priority) {
      const arr = [];
      this._notes.map(x => {
        if (x.priority === priority) {
          arr.push(x);
        }
      });
      return arr
    }
  
    // static Priority = {
    //   LOW: 0,
    //   NORMAL: 1,
    //   HIGH: 2,
    // };
}