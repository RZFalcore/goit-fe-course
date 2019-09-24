import MicroModal from 'micromodal';
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';
import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from './utils/constants';
import {inputBody, inputTitle, ul, form } from './utils/constants';
import {newNotepad, renderNotesList} from './app';

const shortid = require('shortid');
const notyf = new Notyf();

const closeEditor = () => {
  MicroModal.close("note-editor-modal")
}

function submit(event) {
    event.preventDefault();
  
    const title = inputTitle.value.trim();
    const text = inputBody.value.trim();
  
    if (title === '' || text === '') {
      return notyf.error('Fill all fields!');
    }
  
    let id = shortid.generate();
  
    const note = {};
    note.title = title;
    note.body = text;
    note.id = id;
    note.priority = PRIORITY_TYPES.LOW;
  
    newNotepad.saveNote(note)
      .then(renderNote => renderNotesList(renderNote))
      .catch('Error!');

    form.reset();
    closeEditor();
    notyf.success('Note added!');
}
  
function removeListItem() {

    if (event.target.textContent !== 'delete') {
      return
    }

    const itemForDel = event.target.closest('.note-list__item');
    itemForDel.remove();
    const idForDel = itemForDel.dataset.id
    newNotepad.deleteNote(idForDel).then(renderNote => renderNotesList(renderNote)).catch('Error!');

    notyf.success('Note deleted!')
};

function fltr() {
    event.preventDefault();
  
    const text = event.target.value;
    console.log(text);
    newNotepad.filterNotesByQuery(text).then(renderNote => renderNotesList(renderNote)).catch(console.log("Error"))
};

export { submit, removeListItem, fltr };