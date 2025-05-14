
import {
    Text,
    Button,
    Stack,
    HStack,
    RadioGroup,
    Box,
    Center,
    ButtonGroup,
} from '@chakra-ui/react';
import { toaster } from "../componentes/toaster.jsx";
import BarraSuperior from '../componentes/BarraSuperior.jsx';
import { useState, useEffect } from 'react';
import { useMaterialReactTable, MaterialReactTable } from 'material-react-table';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import ImagenProducto from './Rventas/ImagenProducto.jsx';
import Escaner from './Rventas/Escaner.jsx';
import { get_info_producto } from '../api/api_productos.js';
import { useSymbologyScanner } from '@use-symbology-scanner/react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from "../api/axios_config.js";
import { useUsuarioContext } from '../ContextProvider.jsx';

const columnas_tabla = [
    {
        accessorKey: "codigo",
        header: "Código",
        size: 50,
    },
    {
        accessorKey: "nombre",
        header: "Nombre producto",
        size: 100,
    },
    {
        accessorKey: "color",
        header: "Color",
        size: 100,
    },
    {
        accessorKey: "talla",
        header: "Talla",
        size: 100,
    },
    {
        accessorKey: "subtotal",
        header: "Subtotal",
        size: 100,
    },
];

function texto() {
    return (
        <Text textStyle="5xl" color="white">
            Realizar venta
        </Text>
    );
}

export default function Rventas() {
    const [data, setData] = useState([]);
    const [mostrarImagen, setMostrarImagen] = useState(false);
    const [mostrarEscaner, setMostrarEscaner] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);
    const [seleccionado, setSeleccionado] = useState(null);
    const [codigoManual, setCodigoManual] = useState("");
    const [pago, setPago] = useState("efectivo");
    const [ofertas, setOfertas] = useState([]);
    const [total, setTotal] = useState(0);
    const [descuento, setDescuento] = useState(0);
    const [totalFinal, setTotalFinal] = useState(0);
    const { usuario } = useUsuarioContext();

    const hacerVenta = async () => {
        if (data.length === 0) {
            toaster.create({
                title: "ERROR!",
                description: "NO se puede hacer la venta SI NO HAY PRODUCTOS ESCANEADOS",
                type: "error",
            })
            return;
        }

        try {
            let body = {};
            body.productos = data;
            body.pago = pago;
            body.tipo = "en tienda";
            body.total = total;
            body.totalFinal = totalFinal;
            body.descuento = descuento;
            body.id_caja = "67e4f06c9dcadc442adc8a7f";
            body.nombre_cajero = usuario.nombre;

            const res = await axios.post("/ventas/hacer-venta", body);
            toaster.create({
                title: "Éxito",
                description: res.data?.message || "Venta realizada con éxito",
                type: "sucess",
            })

            limpiarTodo();
        } catch (error) {
            const et = error.response?.data?.message || "otro";
            if (et === "Stock insuficiente") {
                let detalles = "";
                error.response.data.faltantes.map(t => {
                    detalles += "Producto: " + t.codigo + ", Requerido: " + t.requerido + " Disponible: " + t.disponible + ",";
                });
                toaster.create({
                    title: "ERROR: Stock insuficiente",
                    description: detalles,
                    type: "error",
                    duration: 7000
                })
            } else {
                toaster.create({
                    title: "ERROR!",
                    description: error.response?.data?.message || "Hubo un error al hacer la venta",
                    type: "error",
                })
            }
        }
    }

    const limpiarTodo = () => {
        setData([]);
        setSeleccionado(null);
        setCodigoManual("");
        setPago("efectivo");
        setTotal(0);
        setDescuento(0);
        setTotalFinal(0);
    }

    const actualizarTotalFinal = () => {
        setTotalFinal(total * (1 - (descuento / 100)));
    }

    const añadirProductoATabla = async (codigo) => {
        setLoadingTable(true);

        try {
            const producto = await get_info_producto(codigo);
            producto.data.subtotal = producto.data.precio;
            setTotal(t => t + producto.data.precio);
            setData([...data, producto.data]);
            toaster.create({
                title: "Escaneado correctamente",
                description: "Se añadió el correctamente el producto",
                type: "sucess",
            })

        } catch (error) {
            toaster.create({
                title: "ERROR",
                description: "No se encontró el producto",
                type: "error",
            })
        }

        setLoadingTable(false);
    }

    const getOfertas = async () => {
        try {
            const res = await axios.get("/ofertas/activas");
            setOfertas(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSymbol = (symbol, matchedSymbologies) => {
        añadirProductoATabla(symbol);
    }

    useSymbologyScanner(handleSymbol)

    const table = useMaterialReactTable({
        columns: columnas_tabla,
        data: data,
        state: { isLoading: loadingTable },
        initialState: { density: "compact", showGlobalFilter: true },
        enableColumnActions: false,
        enableStickyHeader: true,
        enableStickyFooter: true,
        //Elegir solo un renglón
        enableRowSelection: true,
        enableMultiRowSelection: false,
        //Borrar mensaje de selección de renglones
        positionToolbarAlertBanner: "none",
        /*SE ACTUALIZA priceSel CUANDO CLICKEO UN CHECKBOX*/
        muiSelectCheckboxProps: ({ row }) => ({
            onClick: (event) => {
                setSeleccionado(row.original);
            }
        }),
        renderTopToolbarCustomActions: ({ table }) =>
            <Stack direction="row">

                <Stack direction="row">
                    <TextField
                        id="codigo"
                        label="Código"
                        size="small"
                        value={codigoManual}
                        onChange={(event) => setCodigoManual(event.target.value)}
                    />
                    <Button variant="outline" colorPalette="green"
                        onClick={() => {
                            añadirProductoATabla(codigoManual);
                            setCodigoManual("");
                        }}
                    >
                        <AddCircleIcon />
                        Añadir manualmente
                    </Button>
                </Stack>

                <Button onClick={() => setMostrarEscaner(true)} variant="outline" colorPalette="blue">
                    <AddCircleIcon />
                    Escanear con cámara
                </Button>

                {
                    seleccionado && (
                        <>
                            <Button variant="outline" colorPalette="red"
                                onClick={() => {
                                    setLoadingTable(true)
                                    const newData = data.filter(item => item !== seleccionado)
                                    setData(newData);
                                    setTotal(t => t - seleccionado.precio);
                                    setSeleccionado();
                                    table.resetRowSelection();
                                    setLoadingTable(false)
                                }}
                            >
                                <DeleteIcon />
                                Eliminar producto seleccionado
                            </Button>

                            <Button variant="outline" colorPalette="gray" onClick={() => setMostrarImagen(true)}>
                                <InfoIcon />
                                Mostrar imagen del producto
                            </Button>
                        </>
                    )
                }

            </Stack>
    });

    useEffect(() => {
        if (ofertas.length === 0) {
            getOfertas();
        }
        actualizarTotalFinal();

        const handleKeyDown = (e) => {
            if ((e.ctrlKey && (e.key === 'j' || e.key === 'k' || e.key === 'F')) ||
                e.key === 'F1' || e.key === 'F8') {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        document.addEventListener('keydown', handleKeyDown, true); // Use capture phase

        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [total, descuento]);

    return (
        <Stack>
            <BarraSuperior Texto={texto} />

            <MaterialReactTable table={table} />

            <HStack p={4} justifyContent="flex-end">
                <Text fontSize="3xl">
                    Total: ${total.toFixed(2)}
                </Text>
            </HStack>

            {
                descuento !== 0 && (
                    <HStack p={4} justifyContent="flex-end">
                        <Text fontSize="3xl">
                            Total final con descuento: ${totalFinal.toFixed(2)}
                        </Text>
                    </HStack>
                )
            }

            <Escaner mostrar={mostrarEscaner} setMostrar={setMostrarEscaner} añadirProductoATabla={añadirProductoATabla} />

            <ImagenProducto seleccionado={seleccionado} mostrar={mostrarImagen} setMostrar={setMostrarImagen} />


            <Box p="4">
                <Stack gap="8">
                    <RadioGroup.Root value={pago} onValueChange={(e) => setPago(e.value)}>
                        <HStack gap="6">

                            <RadioGroup.Item value="efectivo">
                                <RadioGroup.ItemHiddenInput />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText fontSize="2xl">
                                    Efectivo
                                </RadioGroup.ItemText>
                            </RadioGroup.Item>

                            <RadioGroup.Item value="tarjeta">
                                <RadioGroup.ItemHiddenInput />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText fontSize="2xl">
                                    Tarjeta
                                </RadioGroup.ItemText>
                            </RadioGroup.Item>

                        </HStack>
                    </RadioGroup.Root>

                    <Box>
                        <FormControl>
                            <InputLabel id="oferta-label">Oferta</InputLabel>
                            <Select
                                labelId="oferta-label"
                                id="oferta"
                                label="Oferta"
                                name="oferta"
                                value={descuento}
                                autoWidth
                                onChange={(e) => setDescuento(e.target.value)}
                            >
                                <MenuItem value={0}>
                                    <em>Ninguno</em>
                                </MenuItem>
                                {
                                    ofertas.map((item) => (
                                        <MenuItem key={item._id} value={item.descuento}>{item.nombre}</MenuItem>
                                    ))
                                }
                            </Select>
                            {
                                descuento !== 0 && (
                                    <Text fontSize="xl">
                                        Se aplicará un {descuento}% de descuento
                                    </Text>
                                )
                            }

                        </FormControl>
                    </Box>
                </Stack>
            </Box>

            <Center>
                <ButtonGroup>
                    <Button colorPalette="red" size="2xl" onClick={() => limpiarTodo()}>
                        Cancelar venta
                    </Button>
                    <Button colorPalette="green" size="2xl" onClick={() => hacerVenta()}>
                        Cobrar
                    </Button>
                </ButtonGroup>
            </Center>

        </Stack>
    );
}
