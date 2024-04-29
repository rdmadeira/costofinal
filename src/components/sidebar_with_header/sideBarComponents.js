import React, { useState, useEffect } from 'react';
import { IconButton, Box } from '@chakra-ui/react';
import styled from 'styled-components';

const CartNumberSpan = styled.span`
  position: absolute;
  right: 4px;
  z-index: 1400;
  font-size: 10px;
  color: white;
  border-radius: 50%;
  padding: 0px 5px;
  background: red;
  transform: ${({ cartsize }) => `scale(${cartsize})`};
  transition: 0.4s ease-in all;
`;

export const CustomIconButton = ({ cartNum, ...rest }) => {
  const [cartSize, setCartSize] = useState(1);

  useEffect(() => {
    setCartSize(1.3);

    setTimeout(() => setCartSize(1), 1000);
  }, [cartNum, setCartSize]);

  return (
    <Box pos="relative">
      <CartNumberSpan {...rest} cartsize={cartSize}>
        {cartNum}
      </CartNumberSpan>
      <IconButton {...rest} transform={`scale(${cartSize})`} />
    </Box>
  );
};
