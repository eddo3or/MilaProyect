import { Button, CloseButton, Dialog, Portal, For, List } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { toaster } from "@/componentes/toaster";

import axios from "@/api/axios_config";

export default function DialogListaCambios() {
    const [cambios, setCambios] = useState();

    useEffect(() => {
        const getDatos = () => {
            const peticion = async () => {
                return axios.get("/cajas/log/67e4f06c9dcadc442adc8a7f").then((response) => {
                    setCambios(response.data.log);
                });
            }

            toaster.promise(peticion, {
                success: {
                    title: "Éxito",
                    description: "Se obtuvieron los datos con éxito"
                },
                error: (result) => {
                    return {
                        title: "ERROR!",
                        description: result.response?.data?.message || "Hubo un error obteniendo los datos"
                    }
                },
                loading: { title: "Enviando datos...", description: "Por favor espere" }
            });
        }

        if (!cambios) {
            getDatos();
        }
    })

    if (!cambios) return null;

    return (
        <Dialog.Root scrollBehavior="inside">
            <Dialog.Trigger asChild>
                <Button colorPalette="blue" size="2xl">
                    Ver historial de cambios
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Log de cambios</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                        <Dialog.Body>
                            <List.Root>
                                <For
                                    each={cambios}
                                >
                                    {(item, index) => (
                                        <List.Item key={index}>
                                            {item}
                                        </List.Item>
                                    )}
                                </For>
                            </List.Root>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
