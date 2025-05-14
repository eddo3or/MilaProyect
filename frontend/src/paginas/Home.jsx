import { useNavigate } from 'react-router-dom';

import { Stack, Text, SimpleGrid, GridItem, Button, Image, Center } from '@chakra-ui/react'
import LogoutIcon from '@mui/icons-material/Logout';
import BarraSuperior from '../componentes/BarraSuperior.jsx';
import { useUsuarioContext } from '@/ContextProvider.jsx';

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

	const { usuario } = useUsuarioContext();

	return (
		<Stack h="full" bgGradient="to-t" gradientFrom="red.200" gradientTo="blue.200">
			<BarraSuperior Texto={texto} />

			<SimpleGrid columns={2} gap={"40px"} >
				<GridItem>
					<Center>
						<Image
							rounded="md"
							fit="contain"
							width="30%"
							src="/src/assets/Inventario.png"
						/>
						<Button onClick={() => navigate("/inventario")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							<Text textStyle="3xl">
								Inventario
							</Text>
						</Button>
					</Center>
				</GridItem>

				{
					usuario.puesto === "gerente" && (
						<GridItem>
							<Center>
								<Image
									rounded="md"
									fit="contain"
									width="30%"
									src="/src/assets/Persona.png"
								/>
								<Button onClick={() => navigate("/personal")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
									<Text textStyle="3xl">
										Personal
									</Text>

								</Button>
							</Center>
						</GridItem>
					)
				}

				<GridItem>
					<Center>
						<Image
							rounded="md"
							fit="contain"
							width="30%"
							src="/src/assets/Ofertas.png"
						/>
						<Button onClick={() => navigate("/ofertas")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							<Text textStyle="3xl">
								Ofertas
							</Text>

						</Button>
					</Center>
				</GridItem>

				<GridItem>
					<Center>
						<Image
							rounded="md"
							fit="contain"
							src="/src/assets/Ventas.png"
							width="30%"
						/>
						<Button onClick={() => navigate("/ventas")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
							<Text textStyle="3xl">
								Ventas
							</Text>
						</Button>
					</Center>
				</GridItem>
			</SimpleGrid>

			<Center>
				<Button onClick={() => navigate("/logout")} size="2xl" color="purple.600" variant="outline" width="15%" borderColor="purple.600">
					<LogoutIcon />
					<Text textStyle="2xl">
						Salir
					</Text>
				</Button>
			</Center>

		</Stack>
	);
}
