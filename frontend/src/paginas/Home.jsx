import { useNavigate } from 'react-router-dom';

import gancho from '../assets/Inventario.png';
import etiquetas from '../assets/Ofertas.png';
import persona from '../assets/Persona.png';
import ventas from '../assets/Ventas.png';

import { Stack, Text, SimpleGrid, GridItem, Button, Image, Group } from '@chakra-ui/react'
import LogoutIcon from '@mui/icons-material/Logout';
import BarraSuperior from '../componentes/BarraSuperior.jsx';

function texto() {
	return (
		<Stack color="white">
			<Text textStyle="5xl">
				Bienvenid@
			</Text>
			<Text textStyle="2xl">
				Elija una opción
			</Text>
		</Stack>
	);
}

export default function Home() {
	const navigate = useNavigate();

	return (
		<Stack h="full" bgGradient="to-r" gradientFrom="red.200" gradientTo="blue.200">
			<BarraSuperior Texto={texto} />

			<SimpleGrid columns={2} gap={"40px"} >
				<GridItem>
					<Group>
						<Image
							rounded="md"
							fit="contain"
							width="30%"
							src="/src/assets/Inventario.png"
						/>
						<Button onClick={() => navigate("/inventario")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							Inventario
						</Button>
					</Group>
				</GridItem>

				<GridItem>
					<Group>
						<Image
							rounded="md"
							fit="contain"
							width="30%"
							src="/src/assets/Persona.png"
						/>
						<Button onClick={() => navigate("/personal")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							Personal
						</Button>
					</Group>
				</GridItem>

				<GridItem>
					<Group>
						<Image
							rounded="md"
							fit="contain"
							width="30%"
							src="/src/assets/Ofertas.png"
						/>
						<Button onClick={() => navigate("/ofertas")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							Ofertas
						</Button>
					</Group>
				</GridItem>

				<GridItem>
					<Group>
						<Image
							rounded="md"
							fit="contain"
							src="/src/assets/Ventas.png"
							width="30%"
						/>
						<Button onClick={() => navigate("/ventas")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							Ventas
						</Button>
					</Group>
				</GridItem>

				<Button onClick={() => console.log("TODO: Cerrar sesión")} size="2xl" color="purple.600" variant="outline" width="15%" borderColor="purple.600">
					<LogoutIcon />
					Salir
				</Button>
			</SimpleGrid>
		</Stack>
	);
}
