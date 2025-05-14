import { Button, CloseButton, Dialog, Portal, For, List } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { toaster } from "@/componentes/toaster";

import axios from "@/api/axios_config";
import { MaterialReactTable } from "material-react-table";

const columnas_tabla = [
    {
        accessorKey: "fecha",
        header: "Fecha",
    },
    /*
    {
        accessorKey: "usuario",
        header: "Usuario",
    },
    */
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "detalles",
        header: "Detalles",
    },
];

export default function DialogListaCambios({ cambios }) {

    if (!cambios) return null;

    return (
        <Dialog.Root scrollBehavior="inside" size={"cover"}>
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
                            <MaterialReactTable
                                //Definir datos y columnas
                                columns={columnas_tabla}
                                data={cambios}
                                initialState={{ density: "compact", showGlobalFilter: true }}
                                enableColumnActions={false}
                                enableStickyHeader
                                enableStickyFooter
                                //Borrar mensaje de selección de renglones
                                positionToolbarAlertBanner="none"
                            />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
