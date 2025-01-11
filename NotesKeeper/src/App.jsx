import { useState } from 'react'

import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status] = useState(["Pending", "In progress", "Completed"])
  const [dueDate, setDueDate] = useState('');

  function addNote() {
    setNotes([...notes, { id: Date.now(), title, description }])
    setTitle('');
    setDescription('');
  }
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }


  return (
    <>
      <div className='flex justify-center items-center  bg-purple-800 h-20 text-white font-bold text-4xl font-serif'>
        <h1>Keeper </h1>
      </div>
      <div className='flex justify-center items-center mt-10'>
        <div>
          <input
            type='text'
            placeholder='Task'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3" />
          <textarea placeholder="Comments"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            rows="2" />
          <button onClick={addNote}
            className=" bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-center" >Add</button>
        </div>
      </div>
      <div>
        {notes.map((note) => (
          <div key={note.id} className=" p-4 rounded-xl shadow-lg flex justify-evenly items-center mb-5 mt-5 bg-gray-100">
            <div className='mr-4 m'>
              <h3 className="font-bold">{note.title}</h3>
              <p>{note.description}</p>

            </div>
            <select className="p-2 rounded-lg">
              {status.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))},</select>            
            <div className="flex flex-col justify-center items-center"> 
              <label className='pb-2' >Set Due Date :</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
             
            </div>
            <button onClick={() => deleteNote(note.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-800">Delete</button>
          </div>
        ))}

      </div>
    </>
  )
}

export default App
