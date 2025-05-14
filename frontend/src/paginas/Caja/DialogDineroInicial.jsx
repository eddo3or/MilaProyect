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
    NumberInput,
    Textarea,
    Field,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/api/axios_config';
import { toaster } from '@/componentes/toaster';
import { useUsuarioContext } from '@/ContextProvider';

export default function DialogDineroInicial({ refresh }) {
    const { usuario } = useUsuarioContext();

    const [loading, setLoading] = useState(false);
    const [dinero, setDinero] = useState(800);

    const dialog = useDialog();

    const handleSubmit = () => {
        const peticion = async () => {
            setLoading(true);
            return axios.post("/cajas/modificar-dinero-inicial/67e4f06c9dcadc442adc8a7f", { dinero, gerente: usuario.nombre }).then(() => {
                dialog.setOpen(false);
                refresh();
            }).finally(() => {
                setLoading(false);
            });
        }

        toaster.promise(peticion, {
            success: {
                title: "Éxito",
                description: "Dinero inicial modificado"
            },
            error: (result) => {
                console.log(result)
                return {
                    title: "ERROR!",
                    description: result.response?.data?.message || "Hubo un error modificando el dinero inicial"
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
                <Button colorPalette="blue" size="2xl">
                    Modificar dinero inicial en caja
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Ingresa la cantidad de dinero inicial:</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>

                            <NumberInput.Root
                                defaultValue="800"
                                formatOptions={{
                                    style: "currency",
                                    currency: "MXN",
                                    currencyDisplay: "code",
                                    currencySign: "accounting",
                                }}
                                min={0}
                                value={dinero}
                                onValueChange={(e) => { console.log(e); setDinero(e.valueAsNumber) }}
                            >
                                <NumberInput.Control />
                                <NumberInput.Input />
                            </NumberInput.Root>

                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">
                                    Cancelar
                                </Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={handleSubmit} loading={loading}>Aceptar</Button>
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