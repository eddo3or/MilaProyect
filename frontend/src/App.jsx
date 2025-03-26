//imports bibliotecas
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//imports pages
import Login from './paginas/Login.jsx';
import Home from "./paginas/Home.jsx";

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
