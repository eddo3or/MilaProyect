import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Flex, Stack, HStack, Group, Text, Drawer, Image } from "@chakra-ui/react"

import { useUsuarioContext } from '../ContextProvider';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

export default function BarraSuperior({ Texto }) {
	const { usuario } = useUsuarioContext();
	const navigate = useNavigate();
	const location = useLocation();
	var [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	useEffect(() => {
		var timer = setInterval(() => setDate(new Date(), 1000));
		return function cleanup() {
			clearInterval(timer);
		}
	});

	return (
		<Stack>

			<HStack color="purple" justifyContent="space-between" paddingLeft="6" paddingRight="6" paddingTop="2">
				<Text textStyle="2xl" onClick={() => setOpen(true)}>
					{date.toLocaleTimeString()}
				</Text>
				<Text textStyle="2xl">
					{usuario.nombre}
				</Text>
				<Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
					<Drawer.Backdrop />
					<Drawer.Positioner>
						<Drawer.Content>
							<Drawer.CloseTrigger />
							<Drawer.Header>
								<Drawer.Title>
									Easter Egg :O
								</Drawer.Title>
							</Drawer.Header>
							<Drawer.Body>
								<Image src="/src/assets/shaq.gif" />
							</Drawer.Body>
						</Drawer.Content>
					</Drawer.Positioner>
				</Drawer.Root>
			</HStack>

			<Flex direction="row" justifyContent="space-between" background="yellow.400" paddingLeft="6" paddingTop="4" paddingBottom="4" paddingRight="6">
				<Texto />
				{
					!(location.pathname == "/home") && (
						< Group >
							<Button onClick={() => navigate(-1)} size="2xl" color="purple.600" variant="ghost" borderColor="purple.600">
								<ArrowBackIcon />
								Regresar
							</Button>
							<Button onClick={() => navigate("/home")} size="2xl" color="purple.600" variant="ghost" borderColor="purple.600">
								<HomeIcon />
								Inicio
							</Button>
						</Group>
					)
				}
			</Flex>

		</Stack >
	);
}
