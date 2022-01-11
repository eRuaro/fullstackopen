import './App.css';
import Note from './components/Note';
import { useEffect, useState } from 'react';
import axios from 'axios';
import noteService from './services/notes'

const App = () => {

  const [appNotes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // useEffect is executed immediately after the component is rendered
  const hook = () => {
    console.log('effect');

    noteService.getAll().then(response => {
      setNotes(response.data)
    })
  }

  useEffect(hook, []); // [] means useEffect is only ran with first render

  console.log('render', appNotes.length, 'notes');

  // shows notes
  const notesToShow = showAll ? appNotes : appNotes.filter(
    note => note.important
  )

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // id: appNotes.length + 1, server generates its own id
    }

    // posts data to the server
    noteService.create(noteObject).then(response => {
      setNotes(appNotes.concat(response.data))
      setNewNote('')
    })
    // setNotes(appNotes.concat(noteObject))
    // setNewNote('')
    // console.log('button clicked', event.target)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
    const note = appNotes.find(n => n.id === id)
    // ...note creates a copy of the note
    const changedNote = {...note, important: !note.important}

    // The map method creates a new array by mapping every item 
    // from the old array into an item in the new array. 
    // In our example, the new array is created conditionally so that 
    // if note.id !== id is true, we simply copy the item from the old 
    // array into the new array. If the condition is false, then the 
    // note object returned by the server is added to the array instead.
    noteService.update(id, changedNote).then(response => {
      setNotes(appNotes.map(note => note.id !== id ? note : response.data))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
          <Note 
            key={i} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
          <input 
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit"> save </button>
      </form>
    </div>
  )
}

export default App;
