
import { MaterialReactTable } from 'material-react-table';
import { useState, useEffect } from "react";
import { Stack, Tooltip, Box, IconButton } from "@mui/material";
import { Text } from '@chakra-ui/react';

import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

import BarraSuperior from '../componentes/BarraSuperior.jsx';

import { get_pedidos } from '../api/api_pedidos.js';
import DetallesSolicitud from './formularios/DetallesSolicitud.jsx';
import ActualizarSolicitud from './formularios/ActualizarSolicitud.jsx';

function texto() {
    return (
        <Text textStyle="5xl" color="white">
            Solicitudes
        </Text>
    );
}

const columnas_tabla = [
    {
        accessorKey: "fecha",
        header: "Fecha",
        size: 50,
    },
    {
        accessorKey: "cliente",
        header: "Cliente",
        size: 150,
    },
    {
        accessorKey: "telefono",
        header: "Teléfono",
        size: 60,
    },
    {
        accessorKey: "estatus",
        header: "Estatus",
        size: 60,
    },
    {
        accessorKey: "cantidad",
        header: "Cantidad productos",
        size: 60,
    },
];

export default function Solicitudes() {
    const [data, setData] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [seleccionado, setSeleccionado] = useState([]);
    const [showActualizar, setShowActualizar] = useState(false);
    const [showDetalles, setShowDetalles] = useState(false);

    const consultar = async () => {
        setLoadingTable(s => true);
        try {
            const res = await get_pedidos();
            const pedidosMapeados = res.data.map(pedido => ({
                ...pedido,
                cantidad: pedido.productos.length
            }));

            setData(pedidosMapeados);
        } catch (error) {
            console.log(error);
        }
        setLoadingTable(s => false);
    }

    useEffect(() => {
        consultar();
    }, []);

    return (
        <Stack>
            <BarraSuperior Texto={texto} />

            <MaterialReactTable
                //Definir datos y columnas
                columns={columnas_tabla}
                data={data}
                state={{ isLoading: loadingTable }}
                initialState={{ density: "compact", showGlobalFilter: true }}
                enableColumnActions={false}
                enableStickyHeader
                enableStickyFooter
                //Elegir solo un renglón
                enableRowSelection
                enableMultiRowSelection={false}
                //Borrar mensaje de selección de renglones
                positionToolbarAlertBanner="none"
                /*SE ACTUALIZA priceSel CUANDO CLICKEO UN CHECKBOX*/
                muiSelectCheckboxProps={({ row }) => ({
                    onClick: (event) => {
                        setSeleccionado(row.original);
                    }
                })}
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        {/* ------- BARRA DE ACCIONES ------ */}
                        <Stack direction="row" sx={{ m: 1 }}>
                            <Box>
                                {/* ============ BOTÓN EDITAR ============ */}
                                <Tooltip title="Editar estatus">
                                    <IconButton onClick={() => setShowActualizar(true)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>

                                {/* ============ BOTÓN DETALLES ============ */}
                                <Tooltip title="Ver detalles">
                                    <IconButton onClick={() => setShowDetalles(true)}>
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip>

                            </Box>
                        </Stack>
                        {/* ------- BARRA DE ACCIONES FIN ------ */}
                    </>
                )}
            />
            <ActualizarSolicitud show={showActualizar} setShow={setShowActualizar} refresh={consultar} seleccionado={seleccionado} />
            <DetallesSolicitud show={showDetalles} setShow={setShowDetalles} seleccionado={seleccionado} />
        </Stack>
    );
}
