
import { Text, Stack, Card, VStack, HStack, Center } from '@chakra-ui/react';

import { useState, useEffect } from "react";

import BarraSuperior from '../componentes/BarraSuperior.jsx';

import axios from "../api/axios_config.js";

function texto() {
    return (
        <Text textStyle="5xl" color="white">
            Corte de caja
        </Text>
    );
}

export default function Caja() {
    const [data, setData] = useState();

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
            <Center>
                <Text fontSize="4xl">
                    Información de la caja a fecha: {new Date().toLocaleDateString()}
                </Text>
            </Center>
            <Center>

                <HStack>
                    <VStack align={"flex-start"}>
                        <Card.Root variant="elevated">
                            <Card.Header>
                                Total ventas
                            </Card.Header>
                            <Card.Body>
                                {data.ahora.pagos_tarjeta + data.ahora.pagos_efectivo}
                            </Card.Body>
                        </Card.Root>

                        <Card.Root variant="elevated">
                            <Card.Header>
                                Pagos con tarjeta
                            </Card.Header>
                            <Card.Body>
                                {data.ahora.pagos_tarjeta}
                            </Card.Body>
                        </Card.Root>

                        <Card.Root variant="elevated">
                            <Card.Header>
                                Pagos con efectivo
                            </Card.Header>
                            <Card.Body>
                                {data.ahora.pagos_efectivo}
                            </Card.Body>
                        </Card.Root>
                    </VStack>

                    <VStack align={"flex-start"}>
                        <Card.Root variant="elevated">
                            <Card.Header>
                                Dinero inicial
                            </Card.Header>
                            <Card.Body>
                                ${data.dinero_inicial.toFixed(2)}
                            </Card.Body>
                        </Card.Root>

                        <Card.Root variant="elevated">
                            <Card.Header>
                                Total en tarjeta
                            </Card.Header>
                            <Card.Body>
                                ${data.ahora.total_tarjeta.toFixed(2)}
                            </Card.Body>
                        </Card.Root>

                        <Card.Root variant="elevated">
                            <Card.Header>
                                Total en efectivo
                            </Card.Header>
                            <Card.Body>
                                ${data.ahora.total_efectivo.toFixed(2)}
                            </Card.Body>
                        </Card.Root>
                    </VStack>
                </HStack>
            </Center>
        </Stack>
    );
}
