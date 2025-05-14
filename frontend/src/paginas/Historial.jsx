
import { MaterialReactTable } from 'material-react-table';
import { useState } from "react";
import { Text, Stack, HStack, Input, Button } from '@chakra-ui/react';

import { useFormik } from "formik";
import * as Yup from "yup";

import BarraSuperior from '../componentes/BarraSuperior.jsx';

import { get_ventas, get_ventas_por_fecha } from '../api/api_ventas.js';
import { useEffect } from 'react';
import DialogProductos from './Historial/DialogProductos.jsx';

function texto() {
    return (
        <Text textStyle="5xl" color="white">
            Historial de ventas
        </Text>
    );
}

const columnas_tabla = [
    {
        accessorKey: "_id",
        header: "ID de la venta",
    },
    {
        accessorKey: "fecha",
        header: "Fecha",
    },
    {
        accessorKey: "nombre_cajero",
        header: "Cajero",
    },
    {
        accessorKey: "cantidad_productos",
        header: "Productos",
    },
    {
        accessorKey: "tipo",
        header: "Tipo de venta",
    },
    {
        accessorKey: "pago",
        header: "Tipo de pago",
    },
    {
        accessorKey: "total",
        header: "Subtotal",
    },
    {
        accessorKey: "totalFinal",
        header: "Total (final)",
    },
    {
        accessorKey: "descuento",
        header: "Descuento",
    },
];

export default function Historial() {
    const [data, setData] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [seleccionado, setSeleccionado] = useState();

    const consultar = async () => {
        try {
            const res = await get_ventas();
            const datos_tabla = res.data.flatMap(venta => {
                venta.fecha = new Intl.DateTimeFormat("es-MX", {
                    dateStyle: "long",
                    timeStyle: "short",
                    timeZone: "America/Mazatlan"
                }).format(new Date(venta.fecha));

                venta.total = '$' + venta.total.toFixed(2);
                venta.totalFinal = '$' + venta.totalFinal.toFixed(2);
                venta.descuento = venta.descuento + '%';

                venta.cantidad_productos = venta.productos.length;

                venta.productos = venta.productos.map(p => {
                    p.precio = '$' + p.precio.toFixed(2);
                    return p;
                })

                return venta;
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
                    venta.fecha = new Intl.DateTimeFormat("es-MX", {
                        dateStyle: "long",
                        timeStyle: "short",
                        timeZone: "America/Mazatlan"
                    }).format(new Date(venta.fecha));

                    venta.total = '$' + venta.total.toFixed(2);
                    venta.totalFinal = '$' + venta.totalFinal.toFixed(2);
                    venta.descuento = venta.descuento + '%';

                    venta.cantidad_productos = venta.productos.length;

                    return venta;
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
                    {
                        seleccionado && (
                            <>
                                <DialogProductos datos={seleccionado} refresh={consultar} />
                                <Button
                                    size={"2xl"}
                                    colorPalette={"green"}
                                    variant={"ghost"}
                                    borderColor={"green"}
                                    onClick={() => window.open(import.meta.env.VITE_URL_API + "/ventas/ticket/" + seleccionado._id, '_blank')}
                                >
                                    Descargar ticket
                                </Button>
                            </>
                        )
                    }
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
            />

        </Stack >
    );
}
