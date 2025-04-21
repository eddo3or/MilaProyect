
import { Text, Image, Button, Dialog, Portal, Center, Stack, Alert } from '@chakra-ui/react';
import BarraSuperior from '../componentes/BarraSuperior.jsx';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from 'axios';

const columnas_tabla = [
  {
    accessorKey: "codigo",
    header: "Código",
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
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [seleccionado, setSeleccionado] = useState();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <Stack>
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
            console.log(seleccionado);
          }
        })}
        renderTopToolbarCustomActions={({ table }) => (
          <>
            {/* ------- BARRA DE ACCIONES ------ */}
            <Stack direction="row">
              {/* ============ BOTÓN AGREGAR ============ */}
              <Button onClick={onOpen} variant="outline" colorPalette="blue">
                <AddCircleIcon />
                Escanear con cámara
              </Button>
              {/* ============ BOTÓN ELIMINAR ============ */}
              <Button variant="outline" colorPalette="red"
                onClick={() => {
                  setData(data.filter(item => item !== seleccionado))
                  setSeleccionado();
                }}
              >
                <DeleteIcon />
                Eliminar producto seleccionado
              </Button>
              {/* ============ BOTÓN IMAGEN ============ */}
              <Button variant="outline" colorPalette="gray" onClick={() => setShowInfo(true)}>
                <InfoIcon />
                Mostrar imagen del producto
              </Button>
            </Stack>
            {/* ------- BARRA DE ACCIONES FIN ------ */}
          </>
        )}
      />

      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Content>
            <Dialog.Header justifyContent="center">
              <Text fontWeight="bold" textStyle="xl">
                Escanear QR o código de barras
              </Text>
            </Dialog.Header>
            <Dialog.Body>
              <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={async (err, result) => {
                  if (result) {
                    setLoadingTable(true);
                    const res = await axios.get("https://world.openfoodfacts.org/api/v0/product/" + result.text);
                    const objeto = {
                      codigo: result.text,
                      nombre: res.data.product.name,
                      imagen: res.data.product.image_small_url
                    };
                    setData(elementos => [...elementos, objeto]);
                    console.log(data);
                    setLoadingTable(false);
                    onClose();
                  }
                }}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Portal>
      </Dialog.Root>



      <Dialog.Root open={showInfo} onOpenChange={(e) => setShowInfo(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Content>
            <Dialog.Header justifyContent="center">
              <Text fontWeight="bold" textStyle="xl">
                Imagen del producto
              </Text>
            </Dialog.Header>
            <Dialog.Body>
              <Center>
                {
                  seleccionado && (
                    <>
                      {
                        !seleccionado.imagen && (
                          <Text>
                            No hay imagen del producto :c
                          </Text>
                        )
                      }
                      {
                        seleccionado.imagen && (
                          <Image height="200px" src={seleccionado.imagen} />
                        )
                      }
                    </>
                  )
                }

                {!seleccionado && (
                  <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Title>NO HAS SELECCIONADO UN PRODUCTO</Alert.Title>
                  </Alert.Root>
                )
                }
              </Center>
            </Dialog.Body>
            <Dialog.Footer>
              <Button colorScheme="blue" mr={3} onClick={() => setShowInfo(false)}>
                Cerrar
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Portal>
      </Dialog.Root>

    </Stack>
  );
}
