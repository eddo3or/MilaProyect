
import { MaterialReactTable } from 'material-react-table';
import { useState, useEffect } from "react";
import { Stack, Tooltip, Box } from "@mui/material";
import { IconButton } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import BarraSuperior from '../componentes/BarraSuperior.jsx';

import RegistrarOferta from './formularios/RegistrarOferta.jsx';
import { get_ofertas } from '../api/api_ofertas.js';
import EliminarOferta from './formularios/EliminarOferta.jsx';

function texto() {
    return (<p>Ofertas</p>);
}

const columnas_tabla = [
    {
        accessorKey: "nombre",
        header: "Nombre de la oferta",
        size: 100,
    },
    {
        accessorKey: "descuento",
        header: "Descuento",
        size: 40,
    },
    {
        accessorKey: "inicio",
        header: "Fecha de inicio",
        size: 60,
    },
    {
        accessorKey: "fin",
        header: "Fecha de fin",
        size: 60,
    },
    {
        accessorKey: "estatus",
        header: "Estatus",
        size: 50,
    },
    {
        accessorKey: "descripcion",
        header: "Descripción",
        size: 100,
    }
];

export default function Ofertas() {
    const [ofertas, setOfertas] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [seleccionado, setSeleccionado] = useState({ _id: null });
    const [showRegistrar, setShowRegistrar] = useState(false);
    const [showEliminar, setShowEliminar] = useState(false);

    const consultar = async () => {
        try {
            const res = await get_ofertas();
            setOfertas(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        consultar();
    }, []);

    return (
        <div className="centrado-vertical">
            <BarraSuperior Texto={texto} />

            <Box>
                <Box>
                    <MaterialReactTable
                        //Definir datos y columnas
                        columns={columnas_tabla}
                        data={ofertas}
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
                                        <Tooltip title="Registrar oferta">
                                            <IconButton onClick={() => setShowRegistrar(true)}>
                                                <AddCircleIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {/* ============ BOTÓN EDITAR ============ */}
                                        <Tooltip title="Editar">
                                            <IconButton onClick={() => setShowRegistrar(true)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {/* ============ BOTÓN ELIMINAR ============ */}
                                        <Tooltip title="Eliminar">
                                            <IconButton onClick={() => setShowEliminar(true)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {/* ============ BOTÓN DETALLES ============ */}
                                        <Tooltip title="Imagen del producto">
                                            <IconButton onClick={() => setShowRegistrar(true)}>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>

                                    </Box>
                                </Stack>
                                {/* ------- BARRA DE ACCIONES FIN ------ */}
                            </>
                        )}
                    />
                </Box>
                {/* M O D A L E S */}
                <RegistrarOferta show={showRegistrar} setShow={setShowRegistrar} refresh={consultar} />
                <EliminarOferta show={showEliminar} setShow={setShowEliminar} refresh={consultar} seleccionado={seleccionado} />
            </Box>
        </div>
    );
}
