import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Flex, Stack, HStack, Group, Text } from "@chakra-ui/react"

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

			<HStack color="purple" justifyContent="space-between" paddingLeft="6" paddingRight="6" paddingTop="2">
				<Text textStyle="2xl">
					{date.toLocaleTimeString()}
				</Text>
				<Text textStyle="2xl">
					{usuario.nombre}
				</Text>
			</HStack>

			<Flex direction="row" justifyContent="space-between" background="yellow.400" paddingLeft="6" paddingTop="2" paddingBottom="4" paddingRight={"6"}>
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
