import { useState } from 'react'

import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const[description, setDescription] = useState('')
  
  function addNote() {
    setNotes([...notes, { id: Date.now() , title, description }])
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
        placeholder='Title'
        value={title}
          onChange={(e) => setTitle(e.target.value)}
         className="w-full border border-gray-300 rounded px-3 py-2 mb-3"/>
        <textarea placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          rows="4"/>
          <button onClick={addNote}
          className=" bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-center" >Add</button> 
      </div>
    </div>
     <div>
      {notes.map((note) => (
       <div key={note.id} className=" p-4 rounded-lg shadow-md flex justify-between items-start mb-5"
       >
        <div className='mr-4 m'>
          <h3 className="font-bold">{note.title}</h3>
          <p>{note.description}</p>
        </div>
       <button onClick={()=> deleteNote(note.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>

       </div>
       
      ))}
     </div>
    </>
  )
}

export default App
