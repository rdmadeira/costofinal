import React, { useState } from 'react';
import {
  DrawerContent,
  Drawer,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  Image,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SignUpForm from '../components/forms/SignUpForm';

const Main = ({ isOpen, onClose }) => {
  const [isLogin, setisLogin] = useState(true);
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        size={{ base: 'full', md: 'md' }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={onClose} />
          <DrawerHeader>
            {isLogin ? 'INGRESE A SU CUENTA' : 'REGISTRESE'}
          </DrawerHeader>
          <DrawerBody>
            <SignUpForm
              onClose={onClose}
              loginState={{ isLogin, setisLogin }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Outlet />
      <Flex
        width={'100%'}
        bgColor={'#424a9d'}
        padding={'2'}
        columnGap={'2'}
        wrap={'wrap'}
        justifyContent={'center'}>
        <p style={{ color: '#ffffff' }}>Seguinos en @costo.final </p>
        <a
          href="https://www.instagram.com/costo.final?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noreferrer">
          <Image
            width={'25px'}
            src={process.env.PUBLIC_URL + '/assets/instagram_logo_Wh.jpg'}
            paddingBottom={'2'}
          />
        </a>
        <Heading
          as="h6"
          size={'xs'}
          paddingX={'7'}
          color={'#ffffff'}
          width={'100%'}
          textAlign={'center'}>
          ==== VENTA a FERRETERIAS Y CASAS DE SANITARIOS ====
        </Heading>
      </Flex>
    </>
  );
};

export default Main;
