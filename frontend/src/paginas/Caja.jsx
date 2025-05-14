
import { Text, Stack, Card, VStack, HStack, Center, Box, SimpleGrid, GridItem, Button, ButtonGroup } from '@chakra-ui/react';

import { useState, useEffect } from "react";

import BarraSuperior from '../componentes/BarraSuperior.jsx';

import axios from "../api/axios_config.js";
import DialogDineroInicial from './Caja/DialogDineroInicial.jsx';
import DialogListaCambios from './Caja/DialogListaCambios.jsx';
import { useUsuarioContext } from '@/ContextProvider.jsx';

function texto() {
    return (
        <Text textStyle="5xl" color="white">
            Corte de caja
        </Text>
    );
}

export default function Caja() {
    const [data, setData] = useState();

    const { usuario } = useUsuarioContext();

    const consultar = async () => {
        try {
            const res = await axios.get("/cajas/informacion-ahora/" + "67e4f06c9dcadc442adc8a7f");
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        consultar();
    }, []);

    if (!data) {
        return (
            <>
                <Stack>
                    <BarraSuperior Texto={texto} />
                    <Text>
                        Cargando...
                    </Text>
                </Stack>
            </>
        );
    }

    return (
        <Stack h="full" bgGradient="to-t" gradientFrom="red.200" gradientTo="blue.200">
            <BarraSuperior Texto={texto} />

            <VStack h="full" justify={"space-around"}>
                <Text fontSize="4xl">
                    Información de la caja a fecha: {new Date().toLocaleDateString()}
                </Text>

                <SimpleGrid columns={2} rowGap={"4"} w="80%">

                    <GridItem>
                        <Center>

                            <Card.Root variant="elevated" w="60%">
                                <Card.Header>
                                    <Card.Title>
                                        Total ventas
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    {data.ahora.pagos_tarjeta + data.ahora.pagos_efectivo}
                                </Card.Body>
                            </Card.Root>

                        </Center>
                    </GridItem>


                    <GridItem>
                        <Center>
                            <Card.Root variant="elevated" w="60%">
                                <Card.Header>
                                    <Card.Title>
                                        Dinero inicial
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    ${data.dinero_inicial.toFixed(2)}
                                </Card.Body>
                            </Card.Root>
                        </Center>
                    </GridItem>


                    <GridItem>
                        <Center>
                            <Card.Root variant="elevated" w="60%">
                                <Card.Header>
                                    <Card.Title>
                                        Pagos con tarjeta
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    {data.ahora.pagos_tarjeta}
                                </Card.Body>
                            </Card.Root>

                        </Center>
                    </GridItem>


                    <GridItem>
                        <Center>
                            <Card.Root variant="elevated" w="60%">
                                <Card.Header>
                                    <Card.Title>
                                        Total en tarjeta
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    ${data.ahora.total_tarjeta.toFixed(2)}
                                </Card.Body>
                            </Card.Root>
                        </Center>
                    </GridItem>


                    <GridItem>
                        <Center>
                            <Card.Root variant="elevated" w="60%">
                                <Card.Header>
                                    <Card.Title>
                                        Pagos con efectivo
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    {data.ahora.pagos_efectivo}
                                </Card.Body>
                            </Card.Root>
                        </Center>
                    </GridItem>


                    <GridItem>
                        <Center>
                            <Card.Root variant="elevated" w="60%">
                                <Card.Header>
                                    <Card.Title>
                                        Total en efectivo
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    ${data.ahora.total_efectivo.toFixed(2)}
                                </Card.Body>
                            </Card.Root>
                        </Center>
                    </GridItem>

                </SimpleGrid>


                {
                    usuario.puesto === "gerente" && (
                        <ButtonGroup>
                            <DialogDineroInicial refresh={consultar} />
                            <DialogListaCambios refresh={consultar} />
                        </ButtonGroup>
                    )
                }

            </VStack>

        </Stack>
    );
}
