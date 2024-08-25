import React, { useState, useEffect } from 'react';
import { /* Box, */ Heading, Spinner, Flex, VStack } from '@chakra-ui/react';
import CustomCarousel from '../components/carousel/Carousel';
import NewsCarousel from '../components/carousel/NewsCarousel';
import Limpieza from '../components/carousel/Limpieza';
import { sendItemsToCarrousel } from '../utils/data_utils/dataUtils';
import itemsToCarrousel from '../data/itemsToCarrousel.json';
/* import useGetProducts from '../hooks/useGetProducts'; */

const Home = () => {
  const [itemsToCarousel, setitemsToCarousel] = useState([]);
  /* const { products } = useGetProducts(); */

  useEffect(() => {
    sendItemsToCarrousel(itemsToCarrousel).then((res) => {
      setitemsToCarousel(res);
    });
  }, [sendItemsToCarrousel, setitemsToCarousel]);

  return (
    <VStack
      bgImage={`url(${process.env.PUBLIC_URL}/assets/plumbing-home.jpg)`}
      bgColor={'#f0fff4e0'}
      bgSize="cover"
      bgRepeat="no-repeat"
      w={{ md: `calc(100vw - 14rem)` }}
      bgBlendMode={'lighten'}
      paddingY={'5 0'}
      minH="88vh">
      <Flex
        width={'100%'}
        gap={'50px 30px'}
        wrap="wrap"
        justifyContent={'center'}
        paddingBottom="30px">
        <Heading as={'h1'} color={'#424a9d'} width="100%" textAlign={'center'}>
          Costo Final
        </Heading>

        <Flex width={'100%'} justifyContent="center">
          {itemsToCarousel.length > 0 ? (
            <CustomCarousel items={itemsToCarousel} focusOnSelect={true} />
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}
        </Flex>

        <p
          style={{
            width: '100%',
            padding: '1em 6vw 1em 6vw',
            backgroundColor: '#424a9d',
            color: '#ffffff',
            fontWeight: 'bolder',
          }}>
          Confira las novedades:
        </p>
        <>
          <NewsCarousel
          /* items={products && products['ART DE PESCA']} */
          /* focusOnSelect={true} */
          />
        </>
        <Limpieza />
      </Flex>
    </VStack>
  );
};

export default Home;
