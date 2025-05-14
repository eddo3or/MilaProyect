import { Text, Button, Dialog, Portal } from '@chakra-ui/react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function Escaner({ mostrar, setMostrar, añadirProductoATabla }) {
    return (
        <Dialog.Root open={mostrar} onOpenChange={(e) => setMostrar(e.open)}>
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
                                    añadirProductoATabla(result.text);
                                    setMostrar(false);
                                }
                            }}
                        />
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button colorScheme="blue" mr={3} onClick={() => setMostrar(false)}>
                            Cerrar
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Portal>
        </Dialog.Root>
    );
}