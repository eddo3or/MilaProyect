//imports bibliotecas
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ContextProvider } from './ContextProvider.jsx';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Toaster } from "./componentes/toaster.jsx";

import ProtectedRoute from './ProtectedRoute.jsx';

//imports pages
import Login from './paginas/Login.jsx';
import Home from "./paginas/Home.jsx";
import Personal from './paginas/Personal.jsx';
import Inventario from './paginas/Inventario.jsx';
import Ofertas from './paginas/Ofertas.jsx';
import Ventas from './paginas/Ventas.jsx';
import Logout from './paginas/Logout.jsx';
import Historial from './paginas/Historial.jsx';
import RealizarVenta from './paginas/RealizarVenta.jsx';
import Solicitudes from './paginas/Solicitudes.jsx';
import Caja from './paginas/Caja.jsx';
import Pagina404 from "./paginas/Pagina404.jsx";

import './App.css'

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Toaster />
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<Home />} />
              <Route path='/personal' element={<Personal />} />
              <Route path='/inventario' element={<Inventario />} />
              <Route path='/ofertas' element={<Ofertas />} />
              <Route path='/ventas' element={<Ventas />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/historial' element={<Historial />} />
              <Route path='/realizar-venta' element={<RealizarVenta />} />
              <Route path='/solicitudes' element={<Solicitudes />} />
              <Route path='/caja' element={<Caja />} />
              <Route path='*' element={<Pagina404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </ChakraProvider>
  )
}

export default App;
