import React, { useState } from 'react';
import {
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

const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { products } = useGetProducts();
  let { product: productType } = useParams();
  productType = productType.toUpperCase().replace(/-/g, ' ');

  const [productState, setProductState] = useState();

  const onOpenModalHandle = (product) => {
    setProductState(product);
    onOpen();
  };

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
        <ModalContent>
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
                    _hover={{
                      cursor: 'pointer',
                      transform: 'scale(1.06)',
                      transition: '0.2s ease-out',
                    }}
                    width={'30%'}
                    maxWidth={'2xs'}
                    key={products[productType][product][0].id}
                    onClick={() => onOpenModalHandle(product)}>
                    <CardHeader>
                      <Image
                        width={'50%'}
                        src={
                          process.env.PUBLIC_URL +
                          '/assets/cards/bronce_trafilado_buje_reduccion.jpg'
                        }
                      />
                    </CardHeader>
                    <CardBody>{product.toUpperCase()}</CardBody>
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
