import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Stack, Box, Typography } from "@mui/material"

import { useUsuarioContext } from '../ContextProvider';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

export default function BarraSuperior({ Texto }) {
	const { usuario } = useUsuarioContext();
	const navigate = useNavigate();
	const location = useLocation();

	var [date, setDate] = useState(new Date());
	useEffect(() => {
		var timer = setInterval(() => setDate(new Date(), 1000));
		return function cleanup() {
			clearInterval(timer);
		}
	});

	return (
		<Stack>

			<Stack direction="row" color="purple" justifyContent="space-between" paddingLeft="6" paddingRight="6" paddingTop="2">
				<Typography variant="h6">
					{date.toLocaleTimeString()}
				</Typography>
				<Typography variant="h6">
					{usuario.nombre}
				</Typography>
			</Stack>

			<Stack direction="row" justifyContent="space-between" background="yellow.400" paddingLeft="6" paddingTop="2" paddingBottom="4" paddingRight={"6"}>
				<Texto />
				{
					!(location.pathname == "/home") && (
						<Box >
							<Button onClick={() => navigate(-1)} size="2xl" color="purple.600" variant="ghost" borderColor="purple.600">
								<ArrowBackIcon />
								Regresar
							</Button>
							<Button onClick={() => navigate("/home")} size="2xl" color="purple.600" variant="ghost" borderColor="purple.600">
								<HomeIcon />
								Inicio
							</Button>
						</Box>
					)
				}
			</Stack>

		</Stack >
	);
}
