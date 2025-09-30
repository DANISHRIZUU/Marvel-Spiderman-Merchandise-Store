import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import NotesList from './components/NotesList'
import Home from './components/Home'
import Product from './components/Product'
import Cart from './components/Cart'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}  />
        <Route path='/product/:id' element={<Product/>}></Route>
        <Route path='cart/view' element={<Cart/>}></Route>
      </Routes>
    
  );
}

export default App
