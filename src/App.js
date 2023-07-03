import React, { useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './pages/homepage';
import Signup from './pages/signup';
import Login from './pages/login';
import Notes from './pages/notes';
import About from './pages/about';
import Navbar from './components/navbar';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const { token, user, isLogout } = useSelector(state => state.loginData);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
