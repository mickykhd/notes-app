import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Heading, Button, ButtonGroup, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleChange } from '../../pages/login/assets/loginSlice';

const Navbar = () => {
  const [navTracker, setNavTracker] = useState('');
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector(state => state.loginData);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  const navColor =
    path === '/about'
      ? '#dd6b20'
      : path === '/signup'
      ? '#805ad5'
      : path === '/login'
      ? '#22c35e'
      : '#ff000066';

  const handleLogIn = () => {
    navigate('/login');
    setNavTracker('login');
  };

  const handleLogOut = () => {
    dispatch(
      handleChange({
        name: 'logout',
      })
    );
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'1rem'}
      backgroundColor={`${navColor}`}
      boxShadow={'md'}
      color={'black'}
      fontFamily={'Roboto Serif'}
    >
      <Heading size={'lg'} fontFamily={'Roboto Serif'}>
        Notes Application
      </Heading>

      <Flex>
        <ButtonGroup gap="1" alignItems={'center'}>
          {token && <Text>Welcome {user}</Text>}
          {!token ? (
            <Button
              letterSpacing={'1px'}
              colorScheme="whatsapp"
              onClick={handleLogIn}
            >
              {'Login'}
            </Button>
          ) : (
            <Button
              letterSpacing={'1px'}
              colorScheme="whatsapp"
              onClick={handleLogOut}
            >
              {'Logout'}
            </Button>
          )}
          {!token && (
            <Button
              colorScheme="purple"
              letterSpacing={'1px'}
              onClick={() => {
                navigate('/signup');
                setNavTracker('signup');
              }}
            >
              Signup
            </Button>
          )}
          <Button
            colorScheme="orange"
            letterSpacing={'1px'}
            onClick={() => {
              navigate('/about');
              setNavTracker('about');
            }}
          >
            About
          </Button>
        </ButtonGroup>
        {/* <ColorModeSwitcher /> */}
      </Flex>
    </Box>
  );
};

export default Navbar;
