import React from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css';
import {
  Card,
  CardBody,
  CardHeader,
  Box,
  VStack,
  Text,
  Image,
  Divider,
  Heading,
  Flex,
} from '@chakra-ui/react';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 921 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 920, min: 520 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const NewsCarousel = ({ items }) => {
  console.log('items', items);

  return (
    <Box
      zIndex={'500'}
      position="relative"
      width={'20%'}
      right="0"
      bottom={'0px'}>
      <Flex
        zIndex={'50'}
        pos="absolute"
        fontWeight={'bold'}
        top="-10px"
        width="30%"
        right={'0'}>
        <Image src={process.env.PUBLIC_URL + '/assets/new.png   '} />
      </Flex>
      <Carousel
        arrows={false}
        infinite
        draggable={true}
        autoPlay={true}
        transitionDuration={500}
        responsive={responsive}
        containerClass="news-carousel-container"
        itemClass="carousel-item"
        pauseOnHover={true}>
        {items &&
          items.map((item) => {
            return (
              <Box key={item.id} h="100%">
                <Card
                  h={'100%'}
                  size={{ base: 'md', sm: 'sm' }}
                  align={'center'}
                  justify="center">
                  <CardHeader /* h={'33%'} */ textAlign="center">
                    <VStack alignContent={'center'}>
                      <Heading size={'md'}>Articulos de Pesca</Heading>
                      <Image
                        src={
                          process.env.PUBLIC_URL + '/assets/cards/' + item.img
                        }
                        h={{ base: '9rem', sm: '4rem' }}
                      />
                      <Text fontSize={{ base: 'lg', sm: 'sm' }}>
                        {item.familia}
                      </Text>
                    </VStack>
                  </CardHeader>
                  <CardBody display={'flex'} alignItems="flex-end">
                    <VStack spacing={{ base: 6, sm: 3 }}>
                      <Box>
                        <Text fontSize={{ base: 'lg', sm: 'sm' }}>
                          {item['MEDIDA']}
                        </Text>
                      </Box>
                    </VStack>
                  </CardBody>
                  <Divider color={'gray.300'} />
                </Card>
              </Box>
            );
          })}
      </Carousel>
    </Box>
  );
};

export default NewsCarousel;
