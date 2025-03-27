import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
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
    const navigate = useNavigate();

	return (
		<div className="centrado-vertical" style={{ gap: '30%'}}>
			<BarraSuperior Texto={texto}/>

			<div className="centrado-vertical" style={{ gap: '10%'}}>
				<div className="centrado-horizontal" style={{ gap: '10%'}}>
					<Button className="boton-home" onClick={() => navigate('/inventario')} variant="contained" startIcon={<img className="imagen-boton" src={gancho} alt="inventario" />}>
						Inventario
					</Button>
					<Button className="boton-home" onClick={() => navigate('/personal')} variant="contained" startIcon={<img className="imagen-boton" src={persona} alt="personal" />}>
						Personal
					</Button>
					
				</div>
				<div className="centrado-horizontal" style={{ gap: '10%'}}>
					<Button className="boton-home" variant="contained" startIcon={<img className="imagen-boton" src={etiquetas} alt="ofertas" />}>
						Ofertas
					</Button>
					<Button className="boton-home" variant="contained" startIcon={<img className="imagen-boton" src={ventas} alt="ventas" />}>
						Ventas
					</Button>
				</div>
			</div>
			
		</div>
	);
}
