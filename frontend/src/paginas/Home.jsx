import { useNavigate } from 'react-router-dom';

import { Stack, Grid, Button, Box, Typography } from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout';
import BarraSuperior from '../componentes/BarraSuperior.jsx';

function texto() {
	const navigate = useNavigate();

	return (
		<Stack color="white">
			<Typography variant="5h">
				Bienvenid@
			</Typography>
			<Typography variant="2h">
				Elija una opción
			</Typography>
		</Stack>
	);
}

export default function Home() {
	const navigate = useNavigate();

	return (
		<Stack h="full" bgGradient="to-t" gradientFrom="red.200" gradientTo="blue.200">
			<BarraSuperior Texto={texto} />

			<Grid container spacing={2}>
				<Grid item size={6} >
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					>

						<Box
							component="img"
							src="/src/assets/Inventario.png"
							alt="Inventario"
							sx={{
								width: '30%',
								borderRadius: '16px', // Adjust for more/less rounding
								objectFit: 'contain', // Ensures image fits while maintaining aspect ratio
								display: 'block' // Removes extra space below image
							}}
						/>
						<Button onClick={() => navigate("/inventario")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							<Typography variant="2h">
								Inventario
							</Typography>
						</Button>
					</Box>
				</Grid>

				<Grid item size={6} >
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Box
							component="img"
							src="/src/assets/Persona.png"
							alt="Persona"
							sx={{
								width: '30%',
								borderRadius: '16px', // Adjust for more/less rounding
								objectFit: 'contain', // Ensures image fits while maintaining aspect ratio
								display: 'block' // Removes extra space below image
							}}
						/>
						<Button onClick={() => navigate("/personal")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							<Typography variant="3h">
								Personal
							</Typography>

						</Button>
					</Box>
				</Grid>

				<Grid item size={6} >
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Box
							component="img"
							src="/src/assets/Ofertas.png"
							alt="Ofertas"
							sx={{
								width: '30%',
								borderRadius: '16px', // Adjust for more/less rounding
								objectFit: 'contain', // Ensures image fits while maintaining aspect ratio
								display: 'block' // Removes extra space below image
							}}
						/>
						<Button onClick={() => navigate("/ofertas")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							<Typography variant="3h">
								Ofertas
							</Typography>

						</Button>
					</Box>
				</Grid>

				<Grid item size={6} >
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Box
							component="img"
							src="/src/assets/Ventas.png"
							alt="Ventas"
							sx={{
								width: '30%',
								borderRadius: '16px', // Adjust for more/less rounding
								objectFit: 'contain', // Ensures image fits while maintaining aspect ratio
								display: 'block' // Removes extra space below image
							}}
						/>
						<Button onClick={() => navigate("/ventas")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							<Typography variant="3xl">
								Ventas
							</Typography>
						</Button>
					</Box>
				</Grid>
			</Grid>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Button onClick={() => navigate("/logout")} size="2xl" color="purple.600" variant="outline" width="15%" borderColor="purple.600">
					<LogoutIcon />
					<Typography variant="h6">
						Salir
					</Typography>

				</Button>
			</Box>

		</Stack>
	);
}
