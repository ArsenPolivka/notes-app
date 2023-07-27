import {
	archiveNote,
	deleteNote,
	editNote,
	unarchiveNote
} from "./notes.js";

export function archiveButtonClickHandler(event) {
	const noteId = parseInt(event.target.getAttribute('data-id'));
	archiveNote(noteId);
}

export function unarchiveButtonClickHandler(event) {
	const noteId = parseInt(event.target.getAttribute('data-id'));
	unarchiveNote(noteId);
}

export function editButtonClickHandler(event) {
	const noteId = parseInt(event.target.getAttribute('data-id'));
	editNote(noteId);
}

export function deleteButtonClickHandler(event) {
	const noteId = parseInt(event.target.getAttribute('data-id'));
	deleteNote(noteId);
}
