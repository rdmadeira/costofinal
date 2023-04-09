import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { auth, getUserFromDB } from './firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import * as userActions from './redux/user/userActions';
import SidebarWithHeader from './components/sidebar_with_header/Sidebar_Header.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      let user;
      if (currentUser) {
        getUserFromDB(currentUser.uid).then((userData) => {
          user = userData;
          dispatch(userActions.setUser(user));
        });
      } else {
        dispatch(userActions.setUser(null));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ChakraProvider breakpoints={['xl', ' lg', 'md', 'sm', 'xs']}>
      <SidebarWithHeader />
    </ChakraProvider>
  );
}

export default App;
