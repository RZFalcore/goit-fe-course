export const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

export const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

export const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};


export const ul = document.querySelector('.note-list');
export const form = document.querySelector('.note-editor');
export const inputTitle = document.querySelector('input[name="note_title"]');
export const inputBody = document.querySelector('textarea[name="note_body"]');
export const list = document.querySelector('.note-list');
export const filter = document.querySelector('.search-form');
export const openEditor = document.querySelector('button[data-action="open-editor"]')