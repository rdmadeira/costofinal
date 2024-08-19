import React from 'react';
import { Card, CardBody, CardHeader, Box, Text } from '@chakra-ui/react';
import CustomImage from './CustomImage';
import ChakraBox from './ChakraBox';

import { NavLink } from 'react-router-dom';

const Limpieza = () => {
  return (
    <Box
      zIndex={'500'}
      position="relative"
      transition="all 0.5s ease"
      /* background={'white'} */
      /* opacity={() => (isStopped ? 1 : 0)} */
    >
      {/* <Heading color={'#424a9d'} as="h4" size={{ md: '1.8vw', base: '5vw' }}>
        Articulos de Pesca
      </Heading> */}
      <ChakraBox
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        display={'flex'}
        zIndex={'50'}
        pos="absolute"
        fontWeight={'bold'}
        width="40px"
        height={'40px'}
        /* right={'-20px'} */
        marginBottom="30px">
        <CustomImage src={'/new.png'} width="100%" height={'100%'} />
      </ChakraBox>
      <NavLink to={'products/limpieza'}>
        <Card size={{ base: 'md', sm: 'sm' }} align={'center'} justify="center">
          <CardHeader textAlign={'center'}>
            <Text fontSize={{ base: 'lg', sm: 'sm' }}>
              Artículos de Limpieza
            </Text>
          </CardHeader>
          <CardBody>
            <CustomImage
              src={'/cards/limpieza.jpg'}
              /* h={{ base: '9rem', sm: '4rem' }} */
            />
          </CardBody>
        </Card>
      </NavLink>
    </Box>
  );
};

export default Limpieza;
