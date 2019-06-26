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
      return notyf.error('Необходимо заполнить все поля!');
    }
  
    let id = shortid.generate();
  
    const note = {};
    note.title = title;
    note.body = text;
    note.id = id;
    note.priority = PRIORITY_TYPES.LOW;
  
    newNotepad.saveNote(note);
    // ul.innerHTML = '';
    renderNotesList();

    form.reset();
    closeEditor();
    notyf.success('Заметка добавлена!');
    console.log(newNotepad);
}
  
function removeListItem() {

    if (event.target.textContent !== 'delete') {
      return
    }
    
    const itemForDel = event.target.closest('.note-list__item');
    itemForDel.remove();
    notyf.success('Заметка удалена!')
    const idForDel = itemForDel.dataset.id
    newNotepad.deleteNote(idForDel);
    console.log(newNotepad);
};

function fltr() {
    event.preventDefault();
  
    const text = event.target.value;
    console.log(text);
    const res = newNotepad.filterNotesByQuery(text);
    renderNoteList(ul, res)
};

export { submit, removeListItem, fltr };