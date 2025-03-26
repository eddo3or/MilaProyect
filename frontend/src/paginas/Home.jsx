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

export default function Home() {
	var [date, setDate] = useState(new Date());
	useEffect( () => {
		var timer = setInterval(() => setDate(new Date(), 1000));
		return function cleanup() {
			clearInterval(timer);
		}
	});
	
	return (
		<div className="centrado-vertical">
			<div><p>{date.toLocaleTimeString()}</p></div>

			<div>
				<div>
					<p>
						Bienvenid@ <br/>
						Elija una opción
					</p>
				</div>
				<div>
					<IconButton>
						<ArrowBackIcon/>
					</IconButton>
					<IconButton>
						<HomeIcon/>
					</IconButton>
				</div>
			</div>

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
