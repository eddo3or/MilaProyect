import {useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import gancho from '../assets/Inventario.png';
import etiquetas from '../assets/Ofertas.png';
import persona from '../assets/Persona.png';
import ventas from '../assets/Ventas.png';

import './css/Home.css';

import BarraSuperior from '../componentes/BarraSuperior.jsx';

function texto() {
	return (<p>Bienvenid@. <br/> Elija una opción</p>);
}

export default function Home() {
	return (
		<div className="centrado-vertical">
			<BarraSuperior Texto={texto}/>

			<div className="centrado-vertical">
				<div className="centrado-horizontal">
					<Button variant="contained" startIcon={<img src={gancho} alt="inventario" />}>
						Inventario
					</Button>
					<Button variant="contained" startIcon={<img src={persona} alt="personal" />}>
						Personal
					</Button>
					
				</div>
				<div className="centrado-horizontal">
					<Button variant="contained" startIcon={<img src={etiquetas} alt="ofertas" />}>
						Ofertas
					</Button>
					<Button variant="contained" startIcon={<img src={ventas} alt="ventas" />}>
						Ventas
					</Button>
				</div>
			</div>
			
		</div>
	);
}
