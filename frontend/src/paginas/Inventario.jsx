
import { MaterialReactTable } from 'material-react-table';
import { useState } from "react";
import { Stack, Tooltip, Box } from "@mui/material";
import { IconButton } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import BarraSuperior from '../componentes/BarraSuperior.jsx';

function texto() {
	return (<p>Inventario</p>);
}

const columnas_tabla = [
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
const actualizar_price_seleccionado = async (values) => {
    setLoadingTable(s => true);
    //Si values es null entonces si inicializa un objeto vacío
    //Para que no "truenen" las tablas de los subdocumentos
    if (!values) {
		setProductos({ _id: null });
    } else {
		setProductos(values);
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
              actualizar_price_seleccionado(row.original);
            }
          })}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  {/* ============ BOTÓN AGREGAR ============ */}
                  <Tooltip title="Registrar producto">
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
                  <Tooltip title="Imagen del producto">
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
