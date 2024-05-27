import React, { useState } from 'react';
import { motion, isValidMotionProp } from 'framer-motion';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css';
import {
  Box,
  shouldForwardProp,
  Heading,
  Image,
  chakra,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

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
  const [isStopped, setisStopped] = useState(false);

  return (
    <Box
      zIndex={'500'}
      position="relative"
      width={'min(20%, 165px)'}
      right="0"
      bottom={'0px'}
      transition="all 0.5s ease"
      /* background={'white'} */
      opacity={() => (isStopped ? 1 : 0)}>
      <Heading color={'#424a9d'} as="h5" size={'1.8vw'}>
        Articulos de Pesca
      </Heading>
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
        top="25px"
        width="40px"
        height={'40px'}
        left={'0'}>
        <Image
          src={process.env.PUBLIC_URL + '/assets/new.png'}
          width="100%"
          height={'100%'}
        />
      </ChakraBox>

      <NavLink to={'products/art-de-pesca'}>
        <Carousel
          arrows={false}
          infinite
          autoPlaySpeed={8000}
          autoPlay={true}
          responsive={responsive}
          containerClass="news-carousel-container"
          itemClass="carousel-item"
          pauseOnHover={true}
          customTransition="all 100ms 1000ms"
          transitionDuration="100"
          afterChange={() => setTimeout(() => setisStopped(true), 1500)}
          beforeChange={() => setisStopped(false)}>
          {items &&
            items.map((item) => {
              return (
                <Box key={item.id} h="100%">
                  <Image
                    borderRadius={'60px'}
                    src={
                      process.env.PUBLIC_URL +
                      '/assets/cards/' +
                      item['unique-img']
                    }
                  />
                </Box>
              );
            })}
        </Carousel>
      </NavLink>
    </Box>
  );
};

export default NewsCarousel;
