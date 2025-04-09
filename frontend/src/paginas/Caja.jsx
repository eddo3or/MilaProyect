
import { Text, Stack } from '@chakra-ui/react';

import BarraSuperior from '../componentes/BarraSuperior.jsx';

function texto() {
  return (
    <Text textStyle="5xl" color="white">
      Corte de caja
    </Text>
  );
}

export default function Rventas() {

  return (
    <Stack>
      <BarraSuperior Texto={texto} />
    </Stack>
  );
}
