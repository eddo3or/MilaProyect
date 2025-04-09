
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

import { get_ventas } from '../api/api_ventas.js';
import { useEffect } from 'react';
import ActualizarPersonal from './formularios/ActualizarPersonal.jsx';

function texto() {
  return (
    <Text textStyle="5xl" color="white">
      Historial de ventas
    </Text>
  );
}

const columnas_tabla = [
  {
    accessorKey: "fecha",
    header: "Fecha",
    size: 100,
  },
  {
    accessorKey: "nombre_cajero",
    header: "Cajero",
    size: 150,
  },
  {
    accessorKey: "tipo",
    header: "Tipo de venta",
    size: 50,
  },
  {
    accessorKey: "pago",
    header: "Tipo de pago",
    size: 50,
  },
];

export default function Historial() {
  const [data, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [seleccionado, setSeleccionado] = useState({ _id: null });
  const [showRegistrar, setShowRegistrar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [showActualizar, setShowActualizar] = useState(false);

  const consultar = async () => {
    try {
      const res = await get_ventas();
      setData(res.data);
      console.log(res.data);
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
      />

    </div>
  );
}
