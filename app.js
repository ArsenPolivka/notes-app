
const notes = [
	{
		id: 1,
		timeOfCreation: '2023-07-25 10:00',
		content: 'Buy groceries for the week',
		category: 'Task',
	},
	{
		id: 2,
		timeOfCreation: '2023-07-25 14:30',
		content: 'Idea: Start learning a new language',
		category: 'Idea',
	},
	// Add more sample notes here
];

// Function to render the notes table
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
      <td>${note.content}</td>
      <td>${note.category}</td>
      <td>${datesColumn.innerHTML}</td>
      <td class="actions">
        <button data-id="${note.id}" onclick="editNote(${note.id})">Edit</button>
        <button data-id="${note.id}" onclick="archiveNote(${note.id})">Archive</button>
        <button data-id="${note.id}" onclick="deleteNote(${note.id})">Delete</button>
      </td>
    `;

		notesBody.appendChild(row);
	});
}

// Function to extract dates from a note content using regular expressions
function extractDates(content) {
	const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
	return content.match(dateRegex) || [];
}

// Function to render the summary table
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

// Function to add a new note
function addNote() {
	const content = prompt('Enter your note:');
	const category = prompt('Enter category (Task, Random Thought, Idea):');

	if (content && category) {
		const newNote = {
			id: notes.length + 1,
			timeOfCreation: new Date().toLocaleString(),
			content,
			category,
		};

		notes.push(newNote);
		renderNotes();
		renderSummary();
	}
}

// Function to edit a note
function editNote(noteId) {
	const note = notes.find((n) => n.id === noteId);
	if (!note) return;

	const newContent = prompt('Edit your note:', note.content);
	const newCategory = prompt('Edit category (Task, Random Thought, Idea):', note.category);

	if (newContent && newCategory) {
		note.content = newContent;
		note.category = newCategory;
		renderNotes();
		renderSummary();
	}
}

// Function to archive a note
function archiveNote(noteId) {
	const note = notes.find((n) => n.id === noteId);
	if (!note) return;

	note.archived = true;
	renderNotes();
	renderSummary();
}

// Function to delete a note
function deleteNote(noteId) {
	const noteIndex = notes.findIndex((n) => n.id === noteId);
	if (noteIndex === -1) return;

	notes.splice(noteIndex, 1);
	renderNotes();
	renderSummary();
}

// Initialize the app
function initApp() {
	renderNotes();
	renderSummary();
}

// Attach event listeners
document.getElementById('add-note').addEventListener('click', addNote);

// Initialize the app
initApp();
