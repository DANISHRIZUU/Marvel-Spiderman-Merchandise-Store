import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NotesList from './components/NotesList'
import Home from './components/Home'

function App() {
  

  return (
    <div>
      <Home />
      <NotesList />
    </div>
  );
}

export default App
