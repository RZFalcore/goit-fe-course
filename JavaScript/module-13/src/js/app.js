'use strict';

import MicroModal from 'micromodal';  
import noteTemplate from '../templates/note.hbs';
import Notepad from './notepad-model';
// import initialNotes from '../assets/notes.json';
import { submit, removeListItem, fltr } 
    from './view';
import { ul, form, list, filter, openEditor } 
    from './utils/constants.js';
import '../css/micromodal.css'
import localNotes from '../assets/notes.json'

// let localStrgNotes = localStorage.getItem('notes');

// if (localStrgNotes) {
//     localStrgNotes = JSON.parse(localStrgNotes);
// }
// console.log(localStrgNotes);

// let notes = localStrgNotes ? localStrgNotes : initialNotes;

// const notes = getNotes().then(data => console.log(data));

const newNotepad = new Notepad(localNotes);
console.log(newNotepad.notes);




export const renderNotesList = () => {
    ul.innerHTML = '';
    const createNoteMarkup = note => {
        const res = note.map(note => noteTemplate(note)).join('');
        return res;
    }

    newNotepad.getNotesFromDB()
        .then(notes => ul.insertAdjacentHTML('beforeend', createNoteMarkup(notes)))

    console.log(newNotepad.notes)
    // localStorage.setItem('notes', JSON.stringify(notes))
    
    

}


renderNotesList();


const openEditorAct = () => {
    MicroModal.show("note-editor-modal")
}

form.addEventListener('submit', submit);
list.addEventListener('click', removeListItem);
filter.addEventListener('input', fltr);
openEditor.addEventListener('click', openEditorAct )

export {newNotepad};







