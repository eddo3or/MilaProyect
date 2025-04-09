import { Dialog, DialogContent, DialogTitle, Typography, DialogActions, Button, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataList } from "@chakra-ui/react"

export default function DetallesSolicitud({ show, setShow, seleccionado }) {

    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
        disabled: true
    }

    if (!seleccionado._id) {
        return (
            <Dialog open={show} onClose={() => setShow(false)} fullWidth>

                <DialogTitle style={{ textAlign: 'center' }}>
                    NO has seleccionado un registro de la tabla!
                </DialogTitle>

                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => setShow(false)}>
                        Cerrar
                    </Button>
                </DialogContent>

            </Dialog>
        );
    }

    return (
        <Dialog open={show} onClose={() => setShow(false)} fullWidth>
            <DialogTitle>
                <Typography component="h6">
                    <strong>Detalles del pedido</strong>
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {
                    seleccionado.productos.map(producto => (
                        <>
                            <DataList.Root>
                                <DataList.Item>
                                    <DataList.ItemLabel>Nombre</DataList.ItemLabel>
                                    <DataList.ItemValue>{producto.nombre}</DataList.ItemValue>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.ItemLabel>Talla</DataList.ItemLabel>
                                    <DataList.ItemValue>{producto.talla}</DataList.ItemValue>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.ItemLabel>Color</DataList.ItemLabel>
                                    <DataList.ItemValue>{producto.color}</DataList.ItemValue>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.ItemLabel>Precio</DataList.ItemLabel>
                                    <DataList.ItemValue>{producto.precio}</DataList.ItemValue>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.ItemLabel>Cantidad</DataList.ItemLabel>
                                    <DataList.ItemValue>{producto.cantidad}</DataList.ItemValue>
                                </DataList.Item>
                            </DataList.Root>
                            <Divider />
                        </>
                    ))
                }
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row' }}>

                {/* ============ BOTÓN CERRAR ============ */}
                <Button
                    color="secondary"
                    loadingPosition="start"
                    startIcon={<CloseIcon />}
                    variant="outlined"
                    onClick={() => setShow(false)}
                >
                    <span>CERRAR</span>
                </Button>

            </DialogActions>
        </Dialog >
    );
};