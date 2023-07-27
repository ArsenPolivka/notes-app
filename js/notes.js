import {
	renderNotes,
	renderSummary,
	renderArchivedNotes,
	extractDates
} from './utils.js';

export const notes = [
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
		timeOfCreation: '2023-07-25 10:30',
		content: 'Idea: Start learning a new language',
		category: 'Idea',
		dates: ''
	},
	{
		id: 3,
		name: 'Books',
		timeOfCreation: '2023-07-24 12:30',
		content: 'Read 1 book since 02-08-2023',
		category: 'Idea',
		dates: '02-08-2023'
	},
	{
		id: 4,
		name: 'Job applications',
		timeOfCreation: '2023-07-26 17:20',
		content: 'So hard to find a job now',
		category: 'Random Thought',
		dates: ''
	},
	{
		id: 5,
		name: 'Pet project',
		timeOfCreation: '2023-07-27 09:19',
		content: 'Start implementing a pet project',
		category: 'Idea',
		dates: ''
	},
	{
		id: 6,
		name: 'Learn React',
		timeOfCreation: '2023-07-25 14:30',
		content: 'Start a new React course',
		category: 'Task',
		dates: ''
	},
	{
		id: 7,
		name: 'Learn Typescript',
		timeOfCreation: '2023-07-25 14:30',
		content: 'Start a new Typescript course',
		category: 'Task',
		dates: ''
	},
];

export const archivedNotes = [];

export function addNote() {
	const name = prompt('Enter your note title:');
	const content = prompt('Enter your note:');
	const category = prompt('Enter category (Task, Random Thought, Idea):');

	if (name && content && category) {
		const dates = extractDates(content);
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

export function editNote(noteId) {
	const note = notes.find((n) => n.id === noteId);
	if (!note) return;

	const newName = prompt('Edit your note:', note.name);
	const newContent = prompt('Edit your note:', note.content);
	const newCategory = prompt('Edit category (Task, Random Thought, Idea):', note.category);

	if (newContent && newCategory) {
		const newDates = extractDates(newContent);
		note.name = newName;
		note.content = newContent;
		note.category = newCategory;
		note.dates = newDates;

		renderNotes();
		renderSummary();
	}
}

export function archiveNote(noteId) {
	const note = notes.find((n) => n.id === noteId);
	const noteIndex = notes.findIndex((n) => n.id === noteId);
	if (!note) return;

	archivedNotes.push(note);
	notes.splice(noteIndex, 1);
	note.archived = true;

	renderNotes();
	renderArchivedNotes();
	renderSummary();
}

export function unarchiveNote(noteId) {
	const note = archivedNotes.find((n) => n.id === noteId);
	const noteIndex = archivedNotes.findIndex((n) => n.id === noteId);
	if (!note) return;

	note.archived = false;
	archivedNotes.splice(noteIndex, 1);
	notes.push(note); // Move the note back to the 'notes' array
	renderNotes();
	renderArchivedNotes();
	renderSummary();
}

export function deleteNote(noteId) {
	const noteIndex = notes.findIndex((n) => n.id === noteId);
	if (noteIndex === -1) return;

	notes.splice(noteIndex, 1);
	renderNotes();
	renderSummary();
}
