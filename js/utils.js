import {
	archivedNotes,
	notes
} from "./notes.js";

import {
	archiveButtonClickHandler,
	deleteButtonClickHandler,
	editButtonClickHandler,
	unarchiveButtonClickHandler
} from "./clickHandlers.js";

export function extractDates(content) {
	const dateRegex = /\d{1,2}-\d{1,2}-\d{4}/g;
	return content.match(dateRegex) || [];
}

export function renderNotes() {
	const notesBody = document.getElementById('notes-body');
	notesBody.innerHTML = '';

	notes.forEach((note) => {
		const row = document.createElement('tr');
		const datesColumn = document.createElement('td');
		const datesList = extractDates(note.content);
		datesColumn.textContent = datesList.join(', ');

		row.innerHTML = `
      <td>${note.timeOfCreation}</td>
      <td>${note.name}</td>
      <td>${note.content}</td>
      <td>${note.category}</td>
      <td>${datesColumn.innerHTML}</td>
      <td class="actions">
        <button data-id="${note.id}" class="button action-button edit-button">Edit</button>
        <button data-id="${note.id}" class="button action-button archive-button">Archive</button>
        <button data-id="${note.id}" class="button action-button delete-button">Delete</button>
      </td>
    `;

		const editButtons = row.querySelectorAll('.edit-button');
		editButtons.forEach(button => {
			button.removeEventListener('click', editButtonClickHandler);
			button.addEventListener('click', editButtonClickHandler);
		});

		const archiveButtons = row.querySelectorAll('.archive-button');
		archiveButtons.forEach(button => {
			button.removeEventListener('click', archiveButtonClickHandler);
			button.addEventListener('click', archiveButtonClickHandler);
		});

		const deleteButtons = row.querySelectorAll('.delete-button');
		deleteButtons.forEach(button => {
			button.removeEventListener('click', deleteButtonClickHandler);
			button.addEventListener('click', deleteButtonClickHandler);
		});

		notesBody.appendChild(row);
	});
}

export function renderArchivedNotes() {
	const notesBody = document.getElementById('archived-body');
	notesBody.innerHTML = '';

	archivedNotes.forEach((note) => {
		const row = document.createElement('tr');
		const datesColumn = document.createElement('td');
		const datesList = extractDates(note.content);
		datesColumn.textContent = datesList.join(', ');

		row.innerHTML = `
      <td>${note.timeOfCreation}</td>
      <td>${note.name}</td>
      <td>${note.content}</td>
      <td>${note.category}</td>
      <td>${datesColumn.innerHTML}</td>
      <td class="actions">
        <button data-id="${note.id}" class="button action-button unarchive-button">Unarchive</button>
      </td>
    `;

		const unarchiveButtons = row.querySelectorAll('.unarchive-button');
		unarchiveButtons.forEach(button => {
			button.removeEventListener('click', unarchiveButtonClickHandler);
			button.addEventListener('click', unarchiveButtonClickHandler);
		});

		notesBody.appendChild(row);
	});
}

export function renderSummary() {
	const summaryBody = document.getElementById('summary-body');
	summaryBody.innerHTML = '';

	const categories = ['Task', 'Random Thought', 'Idea'];

	categories.forEach((category) => {
		const activeNotesCount = notes.filter((note) => note.category === category && !note.archived).length;
		const archivedNotesCount = archivedNotes.filter((note) => note.category === category).length;

		const row = document.createElement('tr');
		row.innerHTML = `
      <td>${category}</td>
      <td>${activeNotesCount}</td>
      <td>${archivedNotesCount}</td>
    `;

		summaryBody.appendChild(row);
	});
}
