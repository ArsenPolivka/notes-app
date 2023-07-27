import {
	addNote,
} from './notes.js';

import {
	renderNotes,
	renderSummary,
	renderArchivedNotes
} from './utils.js';

import {
	archiveButtonClickHandler,
	deleteButtonClickHandler,
	editButtonClickHandler,
	unarchiveButtonClickHandler
} from "./clickHandlers.js";

document.getElementById('add-note').addEventListener('click', addNote);

function setupEventListeners() {
	const notesBody = document.getElementById('notes-body');
	const archivedNotesBody = document.getElementById('archived-body');

	notesBody.addEventListener('click', (event) => {
		const target = event.target;
		if (target.classList.contains('edit-button')) {
			editButtonClickHandler(event);
		} else if (target.classList.contains('archive-button')) {
			archiveButtonClickHandler(event);
		} else if (target.classList.contains('delete-button')) {
			deleteButtonClickHandler(event);
		}
	});

	archivedNotesBody.addEventListener('click', (event) => {
		const target = event.target;
		if (target.classList.contains('unarchive-button')) {
			unarchiveButtonClickHandler(event);
		} else if (target.classList.contains('delete-button')) {
			deleteButtonClickHandler(event);
		}
	});
}

function init() {
	setupEventListeners();
	renderNotes();
	renderArchivedNotes();
	renderSummary();
}

init();
