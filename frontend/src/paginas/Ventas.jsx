import { useNavigate } from 'react-router-dom';

import { Stack, Text, SimpleGrid, GridItem, Button, Image, Center } from '@chakra-ui/react'
import LogoutIcon from '@mui/icons-material/Logout';
import BarraSuperior from '../componentes/BarraSuperior.jsx';

function texto() {
    return (
        <Text textStyle="5xl" color="white">
            Ventas
        </Text>
    );
}

export default function Ventas() {
    const navigate = useNavigate();

    return (
        <Stack h="full" bgGradient="to-t" gradientFrom="red.200" gradientTo="blue.200">
            <BarraSuperior Texto={texto} />

            <SimpleGrid columns={2} gap={"40px"} >
                <GridItem>
                    <Center>
                        <Image
                            rounded="md"
                            fit="contain"
                            width="45%"
                            src="/src/assets/Compra.png"
                        />
                        <Button onClick={() => navigate("/rventas")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
                            <Text textStyle="3xl">
                                Realizar venta
                            </Text>
                        </Button>
                    </Center>
                </GridItem>

                <GridItem>
                    <Center>
                        <Image
                            rounded="md"
                            fit="contain"
                            width="40%"
                            src="/src/assets/Historial.png"
                        />
                        <Button onClick={() => navigate("/historial")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
                            <Text textStyle="3xl">
                                Historial de ventas
                            </Text>

                        </Button>
                    </Center>
                </GridItem>

                <GridItem>
                    <Center>
                        <Image
                            rounded="md"
                            fit="contain"
                            width="30%"
                            src="/src/assets/Linea.png"
                        />
                        <Button onClick={() => navigate("/solicitudes")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
                            <Text textStyle="3xl">
                                Solicitudes de venta
                            </Text>

                        </Button>
                    </Center>
                </GridItem>

                <GridItem>
                    <Center>
                        <Image
                            rounded="md"
                            fit="contain"
                            src="/src/assets/Caja.png"
                            width="40%"
                        />
                        <Button onClick={() => navigate("/caja")} size="2xl" variant={"solid"} backgroundColor="yellow.400">
                            <Text textStyle="3xl">
                                Corte de caja
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
