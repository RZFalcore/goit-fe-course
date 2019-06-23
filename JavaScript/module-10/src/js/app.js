'use strict';

import Notepad from './notepad-model';
import initialNotes from '../assets/notes.json';
import { createNoteContent, createNoteFooter, createActionButton, createListItem, renderNoteList,
    addListItem, submit, removeListItem, fltr } 
    from './view';
import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS, ul, form, inputTitle, inputBody, 
    list, filter } 
    from './utils/constants';

const newNotepad = new Notepad(initialNotes);
console.log(newNotepad.notes);

renderNoteList(ul, initialNotes)

form.addEventListener('submit', submit);
list.addEventListener('click', removeListItem);
filter.addEventListener('input', fltr);

export {newNotepad};







