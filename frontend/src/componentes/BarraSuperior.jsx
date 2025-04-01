import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Button, Flex, Stack, HStack, Group, Text } from "@chakra-ui/react"

import { useUsuarioContext } from '../ContextProvider';

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
		<Stack>
			<HStack color="purple" justifyContent="space-between" paddingLeft="6" paddingRight="6" paddingTop="2">
				<Text textStyle="2xl">
					{date.toLocaleTimeString()}
				</Text>
				<Text textStyle="2xl">
					{usuario.nombre}
				</Text>
			</HStack>

			<Flex direction="row" justifyContent="space-between" background="yellow.400" paddingLeft="6" paddingTop="2" paddingBottom="4">
				<Texto />
				<Group>
					<Button size="2xl" color="purple.600" variant="ghost">
						<ArrowBackIcon />
						Regresar
					</Button>
					<Button size="2xl" color="purple.600" variant="ghost">
						<HomeIcon />
						Inicio
					</Button>
				</Group>
			</Flex>

		</Stack>
	);
}
