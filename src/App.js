import './App.css';
import Post from './components/UserPost';
import Signup from './components/signup';
import Signin from './components/signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './components/header';
import Footer from './components/footer';
 import { Button, useColorMode, VStack } from '@chakra-ui/react';

 import { useAuth } from './Context/authContext';
 import { authData } from './config/initials';
  



function App() {
  
  const { authObj } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

 
 console.log(authData.isAuth);

  return (
     <VStack>

<Button
        onClick={toggleColorMode}
        position='fixed'
        top='0'
        right='0'
        m={4}
        bg={colorMode === "light" ? "gray.800" : "gray.300"}
        color={colorMode === "light" ? "gray.300" : "gray.800"}
        _hover={{ bg: colorMode === "light" ? "gray.700" : "gray.400" }}
      >
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <BrowserRouter>
        {/* <Header /> */}
         <Routes>
          <Route exact path="/" element={ authObj.isAuth ? <Post /> : <Signin />} />
          <Route exact path="/post" element={authObj.isAuth ? <Post /> : <Signin />} />
          <Route exact path="/signup" element={authObj.isAuth ? <Post /> : <Signup />} />
          <Route exact path="/signin" element={authObj.isAuth ? <Post /> : <Signin />} />
        </Routes>
        {/* {console.log(authObject.isAuth)} */}
        <Footer />

      </BrowserRouter>
     </VStack>
   
  );
}

export default App;