import React, { useState, useEffect } from 'react';
import { motion, isValidMotionProp } from 'framer-motion';

// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import './style.css';
import {
  Box,
  shouldForwardProp,
  Heading,
  Image,
  chakra,
  Flex,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const CustomImage = ({ ...props }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchImage = async (path) => {
      const fullPath =
        /* 'http://127.0.0.1:5001/costofinal-b391b/us-central1/images/api/images'; */
        'https://us-central1-costofinal-b391b.cloudfunctions.net/images/api/images';

      const fetchResponse = await fetch(fullPath, {
        method: 'POST',
        body: path,
      });

      const fetchData = await fetchResponse.json();

      console.log('fetchData', fetchData);

      return fetchData.url;
    };

    fetchImage(props.src).then((url) => setUrl(url));
  }, [setUrl, url]);

  return <Image {...props} src={url} />;
};

const NewsCarousel = ({ items }) => {
  /* const [isStopped, setisStopped] = useState(true); */

  return (
    <Box
      zIndex={'500'}
      position="relative"
      width={{ base: 'min(80%, 600px)', md: '85%' }}
      right="0"
      bottom={'0px'}
      transition="all 0.5s ease"
      /* background={'white'} */
      /* opacity={() => (isStopped ? 1 : 0)} */
    >
      <Heading color={'#424a9d'} as="h4" size={{ md: '1.8vw', base: '5vw' }}>
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
        width="40px"
        height={'40px'}
        right={'-20px'}
        marginBottom="30px">
        <CustomImage src={'/new.png'} width="100%" height={'100%'} />
      </ChakraBox>

      <NavLink to={'products/art-de-pesca'}>
        <Flex
          wrap={'wrap'}
          justifyContent="center"
          padding="3"
          border={'1px solid #424a9d4a'}
          borderRadius="5px"
          gap="10px"
          /* arrows={false}
          infinite
          autoPlaySpeed={8000}
          autoPlay={true}
          responsive={responsive}
          containerClass="news-carousel-container"
          itemClass="carousel-item"
          pauseOnHover={true}
          customTransition="all 1500ms 300ms"
          transitionDuration="50"
          afterChange={() => setTimeout(() => setisStopped(true), 1500)}
          beforeChange={() => setisStopped(false)} */
        >
          {items &&
            Object.keys(items).map((item) => {
              {
                console.log('items[item]', items[item]);
              }
              return (
                <Box
                  key={items[item].id}
                  w={{
                    base: 'min(100%, 350px)',
                    sm: 'min(100%, 200px)',
                    md: 'min(30%, 150px)',
                  }}>
                  <CustomImage
                    src={'/cards/' + items[item][0]['unique-img']}
                    h="100%"
                  />
                </Box>
              );
            })}
        </Flex>
      </NavLink>
    </Box>
  );
};

export default NewsCarousel;
