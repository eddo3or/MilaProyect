import { Center, Stack, Text, VStack } from "@chakra-ui/react";

export default function Pagina404() {
    return (
        <Stack justifyContent="space-between" h="full">
            <Center>
                <VStack>
                    <Text fontSize="5xl">
                        Error 404
                    </Text>
                    <Text fontSize="2xl">
                        No hemos podido encontrar la página que buscas
                    </Text>
                </VStack>
            </Center>
        </Stack>
    );
}