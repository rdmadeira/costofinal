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
} from '@chakra-ui/react';

import {
  VStack,
  Box,
  Heading,
  Divider,
  Flex,
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';
import useGetProducts from '../hooks/useGetProducts';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/product_grid/ProductGrid';
import { CustomIconButton } from '../components/sidebar_with_header/sideBarComponents';
import CustomImage from '../components/carousel/CustomImage';

const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector((store) => store.cart);

  const { products } = useGetProducts();
  let { product: productType } = useParams();
  productType = productType.toUpperCase().replace(/-/g, ' ');

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
        <Flex
          gap={['6', '4', '7']}
          wrap="wrap"
          justifyContent={'center'}
          padding={['4', '3', '1']}>
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
                    width={['70%', '40%', '30%']}
                    maxWidth={'235px'}
                    minWidth={'190px'}
                    key={products[productType][product][0].id}
                    onClick={() => onOpenModalHandle(product)}>
                    <CardHeader
                      display={'flex'}
                      justifyContent={'center'}
                      padding={'1rem'}>
                      <CustomImage
                        width={'76%'}
                        src={'/cards/' + products[productType][product][0].img}
                        spinner={true}
                      />
                    </CardHeader>
                    <CardBody display={'flex'} alignItems="end">
                      <Text
                        fontSize={
                          /* 'max(1.0vw, 0.6rem)' */ ['14px', '13px', '13px']
                        }>
                        {product.toUpperCase()}
                      </Text>
                    </CardBody>
                  </Card>
                </>
              );
            })}
        </Flex>
      </Box>
    </VStack>
  );
};

export default Products;
