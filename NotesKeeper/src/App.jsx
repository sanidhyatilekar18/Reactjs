import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './Contexts/theme';
import ThemeBtn from './Components/themebtn';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [themeMode, setThemeMode] = useState('light');

  const statusOptions = ['Pending', 'In progress', 'Completed'];

  const addNote = () => {
    if (edit) {
      setNotes(
        notes.map((note) =>
          note.id === editId ? { ...note, title, description, dueDate } : note
        )
      );
      setEdit(false);
      setEditId(null);
    } else {
      setNotes([...notes, { id: Date.now(), title, description, dueDate }]);
    }
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setDueDate(note.dueDate || '');
    setEdit(true);
    setEditId(note.id);
  };

  const lightTheme = () => {
    setThemeMode('light');
  };

  const darkTheme = () => {
    setThemeMode('dark');
  };

  useEffect(() => {
    
    const htmlElement = document.querySelector('body');
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className='dark:bg-gray-800 dark:text-white'>
        <header className="flex justify-center items-center bg-purple-800 h-20 text-white font-bold text-4xl font-serif">
          <h1>To Do List</h1>
        </header>
        <div className="flex flex-wrap items-center">
          <div className="w-full flex justify-end mt-5 mb-6 mr-12">
            <ThemeBtn />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col dark:text-black">
          <div>
            <input
              type="text"
              placeholder="Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <textarea
              placeholder="Comments"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              rows="2"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <button
              onClick={addNote}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-center"
            >
              {edit ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
        <div>
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-4 rounded-xl shadow-lg flex justify-evenly items-center mb-5 mt-5 bg-gray-100 dark:bg-gray-900 dark:text-white"
            >
              <div className="mr-4">
                <h3 className="font-bold">{note.title}</h3>
                <p>{note.description}</p>
                <p>Due Date: {note.dueDate || 'Not set'}</p>
              </div>
              <select className="p-2 rounded-lg dark:bg-gray-700 dark:text-white">
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="flex justify-center items-center flex-col">
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mb-2 hover:bg-red-800"
                >
                  Delete
                </button>
                <button
                  onClick={() => editNote(note)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-800"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
