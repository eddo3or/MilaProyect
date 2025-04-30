
import { MaterialReactTable } from 'material-react-table';
import { useState } from "react";
import { Stack, Tooltip, Box, IconButton } from "@mui/material";
import { Text } from '@chakra-ui/react';

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import BarraSuperior from '../componentes/BarraSuperior.jsx';
import RegistrarPersonal from './formularios/RegistrarPersonal.jsx';
import EliminarPersonal from './formularios/EliminarPersonal.jsx';

import { get_usuarios } from '../api/api_usuarios.js';
import { useEffect } from 'react';
import ActualizarPersonal from './formularios/ActualizarPersonal.jsx';

function texto() {
    return (
        <Text textStyle="5xl" color="white">
            Personal
        </Text>
    );
}

const columnas_tabla = [
    {
        accessorKey: "puesto",
        header: "Puesto",
        size: 30,
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
        size: 100,
    },
    {
        accessorKey: "usuario",
        header: "usuario",
        size: 100,
    },
    {
        accessorKey: "salario",
        header: "Salario",
        size: 50,
    },
    {
        accessorKey: "domicilio",
        header: "Domicilio",
        size: 150,
    },
    {
        accessorKey: "telefono",
        header: "Telefono",
        size: 50,
    }
];

export default function Personal() {
    const [personal, setPersonal] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [seleccionado, setSeleccionado] = useState({ _id: null });
    const [showRegistrar, setShowRegistrar] = useState(false);
    const [showEliminar, setShowEliminar] = useState(false);
    const [showActualizar, setShowActualizar] = useState(false);

    const consultar = async () => {
        try {
            const res = await get_usuarios();
            setPersonal(res.data);
        } catch (error) {
            console.log(error);
        }
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
                data={personal}
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
                                {/* ============ BOTÓN AGREGAR ============ */}
                                <Tooltip title="Registrar personal">
                                    <IconButton onClick={() => setShowRegistrar(true)}>
                                        <AddCircleIcon />
                                    </IconButton>
                                </Tooltip>
                                {/* ============ BOTÓN EDITAR ============ */}
                                <Tooltip title="Actualizar datos de personal seleccionado">
                                    <IconButton onClick={() => setShowActualizar(true)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                {/* ============ BOTÓN ELIMINAR ============ */}
                                <Tooltip title="Eliminar">
                                    <IconButton onClick={() => setShowEliminar(true)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Stack>
                        {/* ------- BARRA DE ACCIONES FIN ------ */}
                    </>
                )}
            />

            <RegistrarPersonal show={showRegistrar} setShow={setShowRegistrar} refresh={consultar} />
            <EliminarPersonal show={showEliminar} setShow={setShowEliminar} refresh={consultar} seleccionado={seleccionado} />
            <ActualizarPersonal show={showActualizar} setShow={setShowActualizar} refresh={consultar} seleccionado={seleccionado} />
        </Stack>
    );
}
