//imports bibliotecas
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ContextProvider } from './ContextProvider.jsx';

//imports pages
import Login from './paginas/Login.jsx';
import Home from "./paginas/Home.jsx";
import Personal from './paginas/Personal.jsx';
import Inventario from './paginas/Inventario.jsx';

import './App.css'

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/personal' element={<Personal />} />
          <Route path='/inventario' element={<Inventario />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App;
