
import { MaterialReactTable } from 'material-react-table';
import { useState, useEffect } from "react";
import { Stack, Tooltip, Box, IconButton } from "@mui/material";
import { Text } from '@chakra-ui/react';

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import BarraSuperior from '../componentes/BarraSuperior.jsx';

import RegistrarProducto from './formularios/RegistrarProducto.jsx';
import EliminarProducto from './formularios/EliminarProducto.jsx';
import { get_productos } from '../api/api_productos.js';
import ActualizarProducto from './formularios/ActualizarProducto.jsx';


function texto() {
  return (
    <Text textStyle="5xl" color="white">
      Inventario
    </Text>
  );
}

const columnas_tabla = [
  {
    accessorKey: "codigo",
    header: "Código",
    size: 50,
  },
  {
    accessorKey: "nombre",
    header: "Nombre del producto",
    size: 100,
  },
  {
    accessorKey: "talla",
    header: "Talla",
    size: 60,
  },
  {
    accessorKey: "color",
    header: "Color",
    size: 60,
  },
  {
    accessorKey: "precio",
    header: "Precio",
    size: 50,
  },
  {
    accessorKey: "unidades",
    header: "Unidades disponibles",
    size: 80,
  },
  {
    accessorKey: "proveedor",
    header: "Proveedor",
    size: 60,
  }
];

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [seleccionado, setSeleccionado] = useState({ _id: null });
  const [showRegistrar, setShowRegistrar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [showActualizar, setShowActualizar] = useState(false);

  const consultar = async () => {
    try {
      const res = await get_productos();
      setProductos(res.data);
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
        data={productos}
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
                <Tooltip title="Registrar producto">
                  <IconButton onClick={() => setShowRegistrar(true)}>
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
                {/* ============ BOTÓN EDITAR ============ */}
                <Tooltip title="Actualizar">
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

      <RegistrarProducto show={showRegistrar} setShow={setShowRegistrar} refresh={consultar} />
      <EliminarProducto show={showEliminar} setShow={setShowEliminar} refresh={consultar} seleccionado={seleccionado} />
      <ActualizarProducto show={showActualizar} setShow={setShowActualizar} refresh={consultar} seleccionado={seleccionado} />
    </Stack>
  );
}
