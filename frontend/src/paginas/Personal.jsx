
import { MaterialReactTable } from 'material-react-table';
import { useState } from "react";
import { Stack, Tooltip, Box } from "@mui/material";
import { IconButton } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import BarraSuperior from '../componentes/BarraSuperior.jsx';

import { get_usuarios } from '../api/api_usuarios.js';
import { useEffect } from 'react';

function texto() {
  return (<p>Personal</p>);
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

  useEffect(() => {
    const consultar = async () => {
      try {
        const res = await get_usuarios();
        setPersonal(res.data);
      } catch (error) {
        console.log(error);
      }
    }
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
                      <IconButton onClick={() => setAddPriceShowModal(true)}>
                        <AddCircleIcon />
                      </IconButton>
                    </Tooltip>
                    {/* ============ BOTÓN EDITAR ============ */}
                    <Tooltip title="Editar">
                      <IconButton onClick={() => setShowFormActualizar(true)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    {/* ============ BOTÓN ELIMINAR ============ */}
                    <Tooltip title="Eliminar">
                      <IconButton onClick={() => setShowFormEliminar(true)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    {/* ============ BOTÓN DETALLES ============ */}
                    <Tooltip title="Detalles">
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
        </Box>
        {/* M O D A L E S */}
      </Box>
    </div>
  );
}
