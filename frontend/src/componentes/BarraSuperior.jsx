import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { useUsuarioContext } from '../ContextProvider';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

export default function BarraSuperior({ Texto }) {
	const { usuario } = useUsuarioContext();
	const navigate = useNavigate();

	var [date, setDate] = useState(new Date());
	useEffect(() => {
		var timer = setInterval(() => setDate(new Date(), 1000));
		return function cleanup() {
			clearInterval(timer);
		}
	});

	return (
		<div className="centrado-vertical">
			<div className="centrado-horizontal" style={{ justifyContent: 'space-between' }}>
				<p>{date.toLocaleTimeString()}</p>
				<p>{usuario.nombre}</p>
			</div>

			<div className="centrado-horizontal" style={{ justifyContent: 'space-between' }}>
				<div>
					<Texto />
				</div>
				<div className="centrado-horizontal">
					<IconButton onClick={() => navigate(-1)}>
						<ArrowBackIcon />
					</IconButton>
					<IconButton onClick={() => navigate("/home")}>
						<HomeIcon />
					</IconButton>
				</div>
			</div>

		</div>
	);
}
