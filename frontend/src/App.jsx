//imports bibliotecas
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ContextProvider } from './ContextProvider.jsx';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

//imports pages
import Login from './paginas/Login.jsx';
import Home from "./paginas/Home.jsx";
import Personal from './paginas/Personal.jsx';
import Inventario from './paginas/Inventario.jsx';
import Ofertas from './paginas/Ofertas.jsx';
import Ventas from './paginas/Ventas.jsx';
import Logout from './paginas/Logout.jsx';
import Historial from './paginas/Historial.jsx';
import Rventas from './paginas/Rventas.jsx';
import Solicitudes from './paginas/Solicitudes.jsx';
import Caja from './paginas/Caja.jsx';

import './App.css'

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
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
            <Route path='/historial' element={<Historial />} />
            <Route path='/rventas' element={<Rventas />} />
            <Route path='/solicitudes' element={<Solicitudes />} />
            <Route path='/caja' element={<Caja />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </ChakraProvider>
  )
}

export default App;
