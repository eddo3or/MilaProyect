import { Text, Image, Button, Dialog, Portal, Center, Alert } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { get_imagen } from '../../api/api_productos';

export default function ImagenProducto({ seleccionado, mostrar, setMostrar }) {
    const [image, setImage] = useState();
    const [error, setError] = useState(null);

    const obtenerImagen = async () => {
        try {
            const img = await get_imagen(seleccionado.imagen);
            const objectURL = URL.createObjectURL(img.data);
            setImage(objectURL);
            setError(null);
        } catch (e) {
            setError(e.response);
        }
    }

    useEffect(() => {
        obtenerImagen();
    }, [seleccionado]);

    if (error) {
        return (
            <Dialog.Root open={mostrar} onOpenChange={(e) => setMostrar(e.open)}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Content>
                        <Dialog.Header justifyContent="center">
                            <Text fontWeight="bold" textStyle="xl">
                                Imagen del producto
                            </Text>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Center>
                                <Alert.Root status="error">
                                    <Alert.Indicator />
                                    <Alert.Title>Hubo un error descargando la imagen del producto</Alert.Title>
                                </Alert.Root>
                            </Center>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button colorScheme="blue" mr={3} onClick={() => obtenerImagen()}>
                                Reintentar
                            </Button>
                            <Button colorScheme="blue" mr={3} onClick={() => setMostrar(false)}>
                                Cerrar
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Portal>
            </Dialog.Root>
        );
    }

    return (
        <Dialog.Root open={mostrar} onOpenChange={(e) => setMostrar(e.open)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Content>
                    <Dialog.Header justifyContent="center">
                        <Text fontWeight="bold" textStyle="xl">
                            Imagen del producto
                        </Text>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Center>
                            {
                                seleccionado && (
                                    <>
                                        {
                                            !seleccionado.imagen && (
                                                <Text>
                                                    No hay imagen del producto :c
                                                </Text>
                                            )
                                        }
                                        {
                                            seleccionado.imagen && (
                                                <Image height="200px" src={image} />
                                            )
                                        }
                                    </>
                                )
                            }

                            {!seleccionado && (
                                <Alert.Root status="error">
                                    <Alert.Indicator />
                                    <Alert.Title>NO HAS SELECCIONADO UN PRODUCTO</Alert.Title>
                                </Alert.Root>
                            )
                            }
                        </Center>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button colorScheme="blue" mr={3} onClick={() => setMostrar(false)}>
                            Cerrar
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Portal>
        </Dialog.Root>
    );
}