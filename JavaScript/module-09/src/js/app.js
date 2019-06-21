'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];


//=====================================================================================================

class Notepad {
  constructor(notes) {
    this._notes = notes;
  }

  get notes () {
  
    return this._notes;
  };

  findNoteById (id) {

    return this.notes.find(note => note.id === id);
  };

  saveNote (note) {

    this._notes.push(note);
    return note;
  };

  deleteNote (id) {

    this._notes.find(x => {
      if (this._notes[x].id === id) {
        this._notes.splice(x, 1);
        break;
    }});
  };
  updateNoteContent (id, updatedContent) {

    this._notes.map(x => {
      if (x.id === id) {
        Object.assign(x, updatedContent);
        break;
      } });
    
  };

  updateNotePriority (id, priority) {
    this._notes.map(key => key.id === id ? key.priority = priority : null);
  };

  filterNotesByQuery (query) {

    const arr = [];

    this._notes.map(key =>  key.title.toLowerCase().includes(query) || key.title.toLowerCase().includes(query) ? arr.push(key) : null);
    return arr
  };

  filterNotesByPriority (priority) {
    const arr = [];
    this._notes.map(x => {
      if (x.priority === priority) {
        arr.push(x);
      }
    });
    return arr
  }

 static Priority = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

}
//====================================================================================
const newNotepad = new Notepad(initialNotes);

console.log(newNotepad.notes);
//====================================================================================
function createNoteContent (title, body){
  const note = document.createElement('div');
  note.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;

  note.append(noteTitle,noteBody);
  return note;
};
//====================================================================================
function createNoteFooter (priority){
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
}
//====================================================================================
function createActionButton() {
  const button = document.createElement('button');
  button.classList.add('action');
  
  const i = document.createElement('i');
  i.classList.add('material-icons');
  i.classList.add('action-icons');
 

  button.append(i);

  return button;
}
//====================================================================================
function createListItem(note){

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
}
//====================================================================================
function renderNoteList(listRef, notes){
  const items = notes.map(item => createListItem(item));
  listRef.innerHTML = '';
  listRef.append(...items);
  console.log(...items);
}
//====================================================================================
const ul = document.querySelector('.note-list');
renderNoteList(ul,initialNotes)

//====================================================================================
//                                      module-9
//====================================================================================


//================================ UniqueID ==========================================
const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);
//================================== Add list Item ===================================    
function addListItem(listRef,note){
  const n = createListItem(note);
  listRef.append(n)
}
//================================= ADD ==============================================
const form = document.querySelector('.note-editor');
const inputTitle = document.querySelector('input[name="note_title"]');
const inputBody = document.querySelector('textarea[name="note_body"]');


form.addEventListener('submit', submit );

function submit (event){
  event.preventDefault();

  const title = inputTitle.value.trim();
  const text = inputBody.value.trim();

  if(title === '' || text === ''){
   alert('Необходимо заполнить все поля!');
  } 

  let id = generateUniqueId();



  const note = {};
  note.title = title;
  note.body = text;
  note.id = id;
  note.priority = PRIORITY_TYPES.LOW;

  newNotepad.saveNote(note);

  addListItem(ul,note)

  form.reset();
  
  console.log(newNotepad);
}


//===========================DEL============================================

const list = document.querySelector('.note-list');

list.addEventListener('click', removeListItem);

function removeListItem (){
  
  if(event.target.textContent !== 'delete'){
    return
  }

  const itemForDel = event.target.closest('.note-list__item');
  itemForDel.remove();
  const idForDel = itemForDel.dataset.id 
  newNotepad.deleteNote(idForDel);
 console.log(newNotepad);
}


//============================FILTER=============================================

const filter = document.querySelector('.search-form');

filter.addEventListener('input', fltr);

function fltr() {
    event.preventDefault();
   
    const text = event.target.value;
    console.log(text);
    const res = newNotepad.filterNotesByQuery(text);
    renderNoteList(ul, res)

  }














