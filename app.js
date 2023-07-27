
const notes = [
	{
		id: 1,
		name: 'Groceries',
		timeOfCreation: '2023-07-25 10:00',
		content: 'Buy groceries for the week',
		category: 'Task',
		dates: ''
	},
	{
		id: 2,
		name: 'New language',
		timeOfCreation: '2023-07-25 14:30',
		content: 'Idea: Start learning a new language',
		category: 'Idea',
		dates: ''
	},
	// Add more sample notes here
];

const archivedNotes = [];

function renderNotes() {
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
function renderArchivedNotes() {
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
        <button data-id="${note.id}" class="button action-button delete-button">Delete</button>
      </td>
    `;

		const unarchiveButtons = row.querySelectorAll('.unarchive-button');
		unarchiveButtons.forEach(button => {
			button.removeEventListener('click', unarchiveButtonClickHandler);
			button.addEventListener('click', unarchiveButtonClickHandler);
		});

		const deleteButtons = row.querySelectorAll('.delete-button');
		deleteButtons.forEach(button => {
			button.removeEventListener('click', deleteButtonClickHandler);
			button.addEventListener('click', deleteButtonClickHandler);
		});

		notesBody.appendChild(row);
	});
}

function archiveButtonClickHandler(event) {
	const noteId = parseInt(event.target.getAttribute('data-id'));
	archiveNote(noteId);
}

function unarchiveButtonClickHandler(event) {
	const noteId = parseInt(event.target.getAttribute('data-id'));
	archiveNote(noteId);
}

function editButtonClickHandler(event) {
	const noteId = parseInt(event.target.getAttribute('data-id'));
	editNote(noteId);
}

function deleteButtonClickHandler(event) {
	const noteId = parseInt(event.target.getAttribute('data-id'));
	deleteNote(noteId);
}

function extractDates(content) {
	const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
	return content.match(dateRegex) || [];
}

function renderSummary() {
	const summaryBody = document.getElementById('summary-body');
	summaryBody.innerHTML = '';

	const categories = ['Task', 'Random Thought', 'Idea'];

	categories.forEach((category) => {
		const activeNotesCount = notes.filter((note) => note.category === category && !note.archived).length;
		const archivedNotesCount = notes.filter((note) => note.category === category && note.archived).length;

		const row = document.createElement('tr');
		row.innerHTML = `
      <td>${category}</td>
      <td>${activeNotesCount}</td>
      <td>${archivedNotesCount}</td>
    `;

		summaryBody.appendChild(row);
	});
}

function addNote() {
	const name = prompt('Enter your note title:');
	const content = prompt('Enter your note:');
	const category = prompt('Enter category (Task, Random Thought, Idea):');
	const dates = prompt('Enter mentioned dates (not required):');

	if (name && content && category) {
		const newNote = {
			id: notes.length + 1,
			name,
			timeOfCreation: new Date().toLocaleString(),
			content,
			category,
			dates
		};

		notes.push(newNote);
		renderNotes();
		renderSummary();
	}
}

function editNote(noteId) {
	const note = notes.find((n) => n.id === noteId);
	if (!note) return;

	const newName = prompt('Edit your note:', note.name);
	const newContent = prompt('Edit your note:', note.content);
	const newCategory = prompt('Edit category (Task, Random Thought, Idea):', note.category);
	const newDates = prompt('Edit dates:', note.dates);

	if (newContent && newCategory) {
		note.name = newName;
		note.content = newContent;
		note.category = newCategory;
		note.dates = newDates;

		renderNotes();
		renderSummary();
	}
}

function archiveNote(noteId) {
	const note = notes.find((n) => n.id === noteId);
	const noteIndex = notes.findIndex((n) => n.id === noteId);
	if (!note) return;

	// If the note is already archived, we should unarchive it instead
	if (note.archived) {
		note.archived = false;
		archivedNotes.splice(archivedNotes.findIndex((n) => n.id === noteId), 1);
	} else {
		archivedNotes.push(note);
		notes.splice(noteIndex, 1);
		note.archived = true;
	}

	renderNotes();
	renderArchivedNotes();
	renderSummary();
}

function deleteNote(noteId) {
	const noteIndex = notes.findIndex((n) => n.id === noteId);
	if (noteIndex === -1) return;

	notes.splice(noteIndex, 1);
	renderNotes();
	renderSummary();
}

function initApp() {
	renderNotes();
	renderSummary();
}

document.getElementById('add-note').addEventListener('click', addNote);

initApp();
