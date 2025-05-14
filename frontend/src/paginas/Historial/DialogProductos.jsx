import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { Stack } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { useState } from "react";
import DialogDevolucion from "./DialogDevolucion";

const columnas_tabla = [
    {
        accessorKey: "codigo",
        header: "Código",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "talla",
        header: "Talla",
    },
    {
        accessorKey: "color",
        header: "Color",
    },
    {
        accessorKey: "precio",
        header: "Precio",
    },
    {
        accessorKey: "estatus",
        header: "Estatus",
    },
];

export default function DialogProductos({ datos, refresh }) {
    const [seleccionado, setSeleccionado] = useState();

    return (
        <Dialog.Root scrollBehavior="inside" size={"cover"} >
            <Dialog.Trigger asChild>
                <Button size="2xl" colorPalette={"blue"} variant={"ghost"} borderColor={"blue"}>
                    Ver productos
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Productos de la venta</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                        <Dialog.Body>
                            <MaterialReactTable
                                //Definir datos y columnas
                                columns={columnas_tabla}
                                data={datos.productos}
                                initialState={{ density: "compact", showGlobalFilter: true }}
                                enableColumnActions={false}
                                enableStickyHeader
                                enableStickyFooter
                                enableRowSelection
                                enableMultiRowSelection={false}
                                //Borrar mensaje de selección de renglones
                                positionToolbarAlertBanner="none"
                                /*SE ACTUALIZA "seleccionado" CUANDO CLICKEO UN CHECKBOX*/
                                muiSelectCheckboxProps={({ row }) => ({
                                    onClick: (event) => {
                                        setSeleccionado(row.original);
                                    }
                                })}
                                renderTopToolbarCustomActions={({ table }) => (
                                    seleccionado && (
                                        <Stack direction={"row"}>
                                            <DialogDevolucion idVenta={datos._id} idProducto={seleccionado.codigo} refresh={refresh} />
                                        </Stack>
                                    )
                                )}
                            />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}