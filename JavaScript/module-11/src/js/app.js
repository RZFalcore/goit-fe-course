'use strict';

import MicroModal from 'micromodal';  
import noteTemplate from '../templates/note.hbs';
import Notepad from './notepad-model';
import initialNotes from '../assets/notes.json';
import { submit, removeListItem, fltr } 
    from './view';
import { ul, form, list, filter, openEditor } 
    from './utils/constants.js';
import '../css/micromodal.css'

const newNotepad = new Notepad(initialNotes);
console.log(newNotepad.notes);



export const renderNotesList = () => {
    ul.innerHTML = '';
    const createNoteMarkup = note => {
    const res = note.map(note => noteTemplate(note)).join('');
    return res;
    }

     const renderedNotes = createNoteMarkup(initialNotes);
    ul.insertAdjacentHTML('beforeend', renderedNotes);
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







