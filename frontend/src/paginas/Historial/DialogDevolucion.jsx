import {
    Dialog,
    Button,
    CloseButton,
    Portal,
    Input,
    Box,
    Image,
    Stack,
    useDialog,
    FileUpload,
    Float,
    Switch,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from "@/api/axios_config";
import { toaster } from '@/componentes/toaster';

export default function DialogDevolucion({ idVenta, idProducto, refresh }) {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    const dialog = useDialog();

    const handleSubmit = async () => {

        const peticion = async () => {
            setLoading(true);
            return axios.post("/ventas/devolucion/" + idVenta + "/" + idProducto, { devolver: checked }).then(() => {
                dialog.setOpen(false);
                refresh();
            }).finally(() => {
                setLoading(false)
            });
        }

        toaster.promise(peticion, {
            success: {
                title: "Éxito",
                description: "Devolución realizada con éxito"
            },
            error: (result) => {
                console.log(result)
                return {
                    title: "ERROR!",
                    description: result.response?.data?.message || "Hubo un error realizando la devolución"
                }
            },
            loading: { title: "Enviando datos...", description: "Por favor espere" }
        });
    }

    return (
        <Dialog.RootProvider
            value={dialog}
        >
            <Dialog.Trigger asChild>
                <Button colorPalette={"red"} variant={"ghost"} borderColor={"red"}>
                    Realizar devolución
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>¿Estás seguro que deseas devolver el producto?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Switch.Root
                                checked={checked}
                                onCheckedChange={(e) => setChecked(e.checked)}
                            >
                                <Switch.Label>
                                    Devolver al stock:
                                </Switch.Label>
                                <Switch.HiddenInput />
                                <Switch.Control>
                                    <Switch.Thumb />
                                </Switch.Control>
                            </Switch.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">
                                    Cancelar
                                </Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={handleSubmit} loading={loading} colorPalette={"red"}>Aceptar</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.RootProvider>
    );
}