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

    for (let x = 0; x < this._notes.length; x++) {
      if (this._notes[x].id === id) {
        this._notes.splice(x, 1);
        break;
      }
    }
  };
  updateNoteContent (id, updatedContent) {

    for (let x in this._notes) {
      if (x.id === id) {
        Object.assign(x, updatedContent);
        break;
      }
    }
  };

  updateNotePriority (id, priority) {

    for (let key of this._notes) {
      key.id === id ? key.priority = priority : null;
    }
  };

  filterNotesByQuery (query) {

    const arr = [];

    for (let key of this._notes) {
      key.title.toLowerCase().includes(query) || key.title.toLowerCase().includes(query) ? arr.push(key) : null
    }
    return arr
  };

  filterNotesByPriority (priority) {
    const arr = [];
    for (let x of this._notes) {
      if (x.priority === priority) {
        arr.push(x);
      }
    }
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

  listRef.append(...items);
  console.log(...items);
}
//====================================================================================
const ul = document.querySelector('.note-list');
renderNoteList(ul,initialNotes)

