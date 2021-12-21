import './App.css';
import Note from './components/Note';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {

  const [appNotes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // useEffect is executed immediately after the component is rendered
  const hook = () => {
    console.log('effect');

    axios.get('http://localhost:3001/notes').then(response => {
      console.log('promise fulfilled');
      setNotes(response.data)
    })
  }
  useEffect(hook, []); // [] means useEffect is only ran with first render

  console.log('render', appNotes.length, 'notes');

  const notesToShow = showAll ? appNotes : appNotes.filter(
    note => note.important
  )

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: appNotes.length + 1,
    }

    setNotes(appNotes.concat(noteObject))
    setNewNote('')
    console.log('button clicked', event.target)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
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
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
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
