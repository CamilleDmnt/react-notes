import { Fragment, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ArrayLib from './lib/array-lib'

import Counter from './components/Counter'
import Filters from './components/Filters'
import NoteList from './components/NoteList'
import AddNoteForm from './components/AddNoteForm'

function App() {

  // Il faut que les API soient synchrone !
  fetch('http://localhost:3000/notes') // rentrer l'URL 
    .then(response => response.json())
    .then(data => console.log(data));

  // BOUCLE INFINIE, setter dans le contructeur
  // fetch ('http://localhost:3000/notes')
  //.then(response => response.json())
  //.then(data => notesRAWSetter(data));

  // ESSAIE AVEC ASYNC
  // const asyn loadNotes = () => {
  //   const response = await fetch('http://localhost:3000/notes');
  //   const data = await response.json();
  //   notesRAWSetter(data);
  //   console.log('data:' , data);
  // };

  // loadNotes();

  useEffect(() => {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        notesRAWSetter(data);
        setNotes(data);
      });
  }, []);



  const pureNotes = [
    { id: 11, text: "première note" },
    { id: 12, text: "deuxième note" },
    { id: 33, text: "troisième note" }
  ]

  const [notesRAW, notesRAWSetter] = useState([...pureNotes]);

  const [notes, setNotes] = useState([...notesRAW]);


  const [filters, filtersSetter] = useState(
    { keyword: '' }
  );

  function noteFilter() {
    returnnotesRAW.filter(n => n.text.includes(filters.keyword));
  } 

  function onRemoveBtnHandler(noteToDelete) {
    const noteRawNewValues = ArrayLib.remove(notesRAW, noteToDelete);
    notesRAWSetter(noteRawNewValues);
    updateFiltered(noteRawNewValues);
  }

  function onNoteAddedHandler(newNote) {
    const noteRawNewValues = [...notesRAW, newNote];
    notesRAWSetter(noteRawNewValues);
    updateFiltered(noteRawNewValues)
  }

  function updateFiltered(notes) {
    setNotes([...notes]);
  }

  function onFilterChangedHandler(keyword) {
    console.log('filters: ', keyword)
    filtersSetter({
      keyword: keyword
    });
    if (keyword.length > 0) setNotes(notesRAW.filter(n => n.text.toLowerCase().includes(keyword)));
    else setNotes(notesRAW);
  }

  return (
    <>
      <h1>Application Notes</h1>
      <Counter notes={notes} />
      <AddNoteForm onNoteAdded={onNoteAddedHandler} />
      <Filters filters={filters} onFilterChanged={onFilterChangedHandler} />
      <NoteList notes={notes} onRemoveBtn={onRemoveBtnHandler} />
    </>
  )
}

export default App


