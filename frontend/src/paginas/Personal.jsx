
import { MaterialReactTable } from 'material-react-table';
import { useState } from "react";
import { Stack, Tooltip, Box } from "@mui/material";
import { IconButton } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from '@mui/icons-material/Refresh';


import BarraSuperior from '../componentes/BarraSuperior.jsx';

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
const actualizar_price_seleccionado = async (values) => {
    setLoadingTable(s => true);
    //Si values es null entonces si inicializa un objeto vacío
    //Para que no "truenen" las tablas de los subdocumentos
    if (!values) {
		setPersonal({ _id: null });
    } else {
		setPersonal(values);
    }
    setLoadingTable(s => false);
  };

	return (
		<div className="centrado-vertical">
			<BarraSuperior Texto={texto}/>

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
              actualizar_price_seleccionado(row.original);
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
