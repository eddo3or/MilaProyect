
import { MaterialReactTable } from 'material-react-table';
import { useState } from "react";
import { Text, Stack, HStack, Input, Button } from '@chakra-ui/react';

import { useFormik } from "formik";
import * as Yup from "yup";

import BarraSuperior from '../componentes/BarraSuperior.jsx';

import { get_ventas, get_ventas_por_fecha } from '../api/api_ventas.js';
import { useEffect } from 'react';

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
    accessorKey: "nombre",
    header: "Nombre",
    size: 150,
  },
  {
    accessorKey: "talla",
    header: "Talla",
    size: 50,
  },
  {
    accessorKey: "precio",
    header: "Precio",
    size: 100,
  },
  {
    accessorKey: "cantidad",
    header: "Cantidad",
    size: 50,
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
  // {
  //   accessorKey: "total",
  //   header: "Total",
  //   size: 50,
  // },
  {
    accessorKey: "nombre_cajero",
    header: "Cajero",
    size: 150,
  },
];

export default function Historial() {
  const [data, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [seleccionado, setSeleccionado] = useState([]);

  const consultar = async () => {
    try {
      const res = await get_ventas();
      const datos_tabla = res.data.flatMap(venta => {
        // Extract sale data (excluding products array)
        const { productos, ...datos } = venta;

        // Map each product to include the sale data
        return venta.productos.map(producto => ({
          ...producto,
          ...datos
        }));
      });

      setData(datos_tabla);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    consultar();
  }, []);

  const formik = useFormik({
    initialValues: {
      fecha_inicio: "",
      fecha_fin: ""
    },
    validationSchema: Yup.object({
      fecha_inicio: Yup.date().required("Campo requerido"),
      fecha_fin: Yup.date().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await get_ventas_por_fecha(values);
        const datos_tabla = res.data.flatMap(venta => {
          // Extract sale data (excluding products array)
          const { productos, ...datos } = venta;

          // Map each product to include the sale data
          return venta.productos.map(producto => ({
            ...producto,
            ...datos
          }));
        });

        setData(datos_tabla);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Stack>
      <BarraSuperior Texto={texto} />

      <form onSubmit={formik.handleSubmit}>
        <HStack padding={4}>
          <Stack>
            <Text color="black">Fecha inicial:</Text>
            <Input id="fecha_inicio" name="fecha_inicio" value={formik.values.fecha_inicio} onChange={formik.handleChange} />
          </Stack>
          <Stack>
            <Text color="black">Fecha final:</Text>
            <Input id="fecha_fin" name="fecha_fin" value={formik.values.fecha_fin} onChange={formik.handleChange} />
          </Stack>
          <Button type="submit" size="2xl" color="purple.600" variant="ghost" borderColor="purple.600">
            <Text>Filtrar por fecha</Text>
          </Button>
          <Button onClick={consultar} size="2xl" color="purple.600" variant="ghost" borderColor="purple.600">
            <Text>Recargar tabla</Text>
          </Button>
        </HStack>
      </form>

      <MaterialReactTable
        //Definir datos y columnas
        columns={columnas_tabla}
        data={data}
        state={{ isLoading: loadingTable }}
        initialState={{ density: "compact", showGlobalFilter: true }}
        enableColumnActions={false}
        enableStickyHeader
        enableStickyFooter
        //Borrar mensaje de selección de renglones
        positionToolbarAlertBanner="none"
        /*SE ACTUALIZA "seleccionado" CUANDO CLICKEO UN CHECKBOX*/
        muiSelectCheckboxProps={({ row }) => ({
          onClick: (event) => {
            setSeleccionado(row.original);
          }
        })}
      />

    </Stack>
  );
}
