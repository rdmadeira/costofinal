import React from 'react';

// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import './style.css';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  /* CardHeader, */
  Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import CustomImage from './CustomImage';
import ChakraBox from './ChakraBox';

const NewsCarousel = () => {
  /* const [isStopped, setisStopped] = useState(true); */

  return (
    <Box zIndex={'500'} position="relative" transition="all 0.5s ease">
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
        <CustomImage src={'/new.png'} />
      </ChakraBox>

      <NavLink to={'products/art-de-pesca'}>
        <Card
          size={{ base: 'md', sm: 'sm' }}
          align={'center'}
          justify="center"
          width={'2xs'}>
          <CardBody>
            <CustomImage
              src={'/cards/multifilamentos.jpg'}
              spinner={true}
              /* width={'50%'}
              height={'50%'} */
              /* h={{ base: '9rem', sm: '4rem' }} */
            />
          </CardBody>
          <CardFooter textAlign={'center'}>
            <Text fontSize={{ base: 'lg', sm: 'sm' }}>Artículos de Pesca</Text>
          </CardFooter>
        </Card>
      </NavLink>
    </Box>
  );
};

export default NewsCarousel;
