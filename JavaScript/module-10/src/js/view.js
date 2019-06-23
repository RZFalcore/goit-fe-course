const shortid = require('shortid');
import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from './utils/constants';
import {inputBody, inputTitle, ul, form } from './utils/constants';
import {newNotepad} from './app';

function createNoteContent(title, body) {
    const note = document.createElement('div');
    note.classList.add('note__content');
  
    const noteTitle = document.createElement('h2');
    noteTitle.classList.add('note__title');
    noteTitle.textContent = title;
  
    const noteBody = document.createElement('p');
    noteBody.classList.add('note__body');
    noteBody.textContent = body;
  
    note.append(noteTitle, noteBody);
    return note;
};

function createNoteFooter(priority) {
    const footer = document.createElement('footer');
    footer.classList.add('note__footer');
    const firstSection = document.createElement('section');
    firstSection.classList.add('note__section');
  
    const decPriorBtn = createActionButton();
    decPriorBtn.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;
    decPriorBtn.firstElementChild.textContent = ICON_TYPES.ARROW_DOWN;
  
    const incPriorBtn = createActionButton();
    incPriorBtn.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;
    incPriorBtn.firstElementChild.textContent = ICON_TYPES.ARROW_UP;
  
    const footerSpan = document.createElement('span');
    footerSpan.classList.add('note__priority');
    footerSpan.textContent = 'Priority: ' + priority;
  
    const secondSection = document.createElement('section');
    secondSection.classList.add('note__section');
  
    const editBtn = createActionButton();
    editBtn.dataset.action = NOTE_ACTIONS.EDIT;
    editBtn.firstElementChild.textContent = ICON_TYPES.ARROW_DOWN;
  
    const deleteBtn = createActionButton();
    deleteBtn.dataset.action = NOTE_ACTIONS.DELETE;
    deleteBtn.firstElementChild.textContent = ICON_TYPES.DELETE;
  
    firstSection.append(decPriorBtn, incPriorBtn, footerSpan);
    secondSection.append(editBtn, deleteBtn);
    footer.append(firstSection, secondSection);
  
    return footer;
};

function createActionButton() {
    const button = document.createElement('button');
    button.classList.add('action');
  
    const i = document.createElement('i');
    i.classList.add('material-icons');
    i.classList.add('action-icons');
  
  
    button.append(i);
  
    return button;
};

function createListItem(note) {

    const listItem = document.createElement('li')
    listItem.dataset.id = note.id;
    listItem.classList.add('note-list__item');
  
    const box = document.createElement('div');
    box.classList.add('note');
  
    const content = createNoteContent(note.title, note.body);
    const foot = createNoteFooter(note.priority);
  
  
    box.append(content, foot);
    listItem.append(box);
  
    return listItem;
};

function renderNoteList(listRef, notes) {
    const items = notes.map(item => createListItem(item));
    listRef.innerHTML = '';
    listRef.append(...items);
    console.log(...items);
};

function addListItem(listRef, note) {
    const n = createListItem(note);
    listRef.append(n)
};

function submit(event) {
    event.preventDefault();
  
    const title = inputTitle.value.trim();
    const text = inputBody.value.trim();
  
    if (title === '' || text === '') {
      alert('Необходимо заполнить все поля!');
    }
  
    let id = shortid.generate();
  
    const note = {};
    note.title = title;
    note.body = text;
    note.id = id;
    note.priority = PRIORITY_TYPES.LOW;
  
    newNotepad.saveNote(note);
  
    addListItem(ul, note)
  
    form.reset();
  
    console.log(newNotepad);
}
  
function removeListItem() {

    if (event.target.textContent !== 'delete') {
      return
    }
  
    const itemForDel = event.target.closest('.note-list__item');
    itemForDel.remove();
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

export { createNoteContent, createNoteFooter, createActionButton, createListItem, renderNoteList,
    addListItem, submit, removeListItem, fltr };