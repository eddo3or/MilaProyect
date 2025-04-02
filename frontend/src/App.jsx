//imports bibliotecas
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ContextProvider } from './ContextProvider.jsx';

//imports pages
import Login from './paginas/Login.jsx';
import Home from "./paginas/Home.jsx";
import Personal from './paginas/Personal.jsx';
import Inventario from './paginas/Inventario.jsx';
import Ofertas from './paginas/Ofertas.jsx';
import Ventas from './paginas/Ventas.jsx';
import Logout from './paginas/Logout.jsx';

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
            <Route path='/ofertas' element={<Ofertas />} />
            <Route path='/ventas' element={<Ventas />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
  )
}

export default App;
