import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BsCart4 } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';

import {
  VStack,
  Box,
  /* 
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon, */
  Heading,
  Divider,
  Flex,
  Card,
  CardHeader,
  Image,
  CardBody,
} from '@chakra-ui/react';
import useGetProducts from '../hooks/useGetProducts';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/product_grid/ProductGrid';
import { CustomIconButton } from '../components/sidebar_with_header/sideBarComponents';

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

      return fetchData.url;
    };

    fetchImage(props.src).then((url) => setUrl(url));
  }, [setUrl, url]);

  return url ? <Image {...props} src={url} /> : <Spinner />;
};

const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector((store) => store.cart);

  const { products } = useGetProducts();
  let { product: productType } = useParams();
  productType = productType.toUpperCase().replace(/-/g, ' ');
  console.log('productType', 'products', productType, products);

  const [productState, setProductState] = useState();

  const onOpenModalHandle = (product) => {
    setProductState(product);
    onOpen();
  };

  const [bgColor, setBgColor] = useState('white');
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      setBgColor('red');
      setTimeout(() => setBgColor('white'), 700);
    } else didMount.current = true;
  }, [cart, setBgColor]);

  return (
    <VStack
      spacing={'4'}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      w="100%"
      py={'5'}
      px={'10'}>
      <Heading as="h6" size={'md'} color="#4146a3b5">
        {products && productType}
      </Heading>
      <Divider />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="outside"
        size={'3xl'}>
        <ModalOverlay />
        <ModalContent
          bgColor={bgColor === 'red' ? '#e3ffe2' : 'none'}
          transition={'ease-in 0.2s 0 all'}>
          <ModalHeader>{productState?.toUpperCase()}</ModalHeader>
          <ModalBody>
            <VStack>
              <ProductGrid
                product={products && products[productType][productState]}
                productType={productType}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ModalCloseButton />
            <NavLink to="/cart">
              <CustomIconButton
                cartNum={cart && cart.length}
                variant="solid"
                aria-label="open menu"
                icon={<BsCart4 />}
              />{' '}
            </NavLink>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box width="100%">
        <Flex gap={'4'} wrap="wrap" justifyContent={'center'}>
          {products &&
            Object.keys(products[productType]).map((product) => {
              return (
                <>
                  <Card
                    alignItems={'center'}
                    _hover={{
                      cursor: 'pointer',
                      transform: 'scale(1.06)',
                      transition: '0.2s ease-out',
                    }}
                    width={'30%'}
                    maxWidth={'2xs'}
                    minWidth={'150px'}
                    key={products[productType][product][0].id}
                    onClick={() => onOpenModalHandle(product)}>
                    <CardHeader
                      display={'flex'}
                      justifyContent={'center'}
                      padding={'1rem'}>
                      <CustomImage
                        width={'76%'}
                        src={'/cards/' + products[productType][product][0].img}
                      />
                    </CardHeader>
                    <CardBody display={'flex'} alignItems="end">
                      <Text fontSize={'max(1.0vw, 0.6rem)'}>
                        {product.toUpperCase()}
                      </Text>
                    </CardBody>
                  </Card>
                </>
              );
            })}
        </Flex>
      </Box>

      {/* 
        <Accordion allowToggle>
          {products &&
            Object.keys(products[productType]).map((product) => {
              return (
                <AccordionItem key={product}>
                  <AccordionButton
                    _expanded={{ bg: 'green.400', color: 'white' }}>
                    <Box>{product}</Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <VStack>
                      <ProductGrid
                        product={products[productType][product]}
                        productType={productType}
                      />
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
        </Accordion>
      </Box> */}
    </VStack>
  );
};

export default Products;
