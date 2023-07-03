import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleChange } from './assets/loginSlice';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (!input.email || !input.password) {
      // setError(true);
      return;
    }
    setLoading(false);
    try {
      setLoading(true);
      const url = 'https://notes-backend-uasa.onrender.com/api/login';
      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      setLoading(false);
      console.log(data.status);
      setErrorStatus(data.status);
      const info = await data.json();
      dispatch(handleChange({ name: 'token', value: info }));
      console.log(info);
      // dispatch(handleChange({ name: 'token', value: info }));

      // localStorage.setItem('tokenDetails', JSON.stringify(info));

      if (data.status === 400) {
        // setLoggedStatus(true);
      } else if (data.status === 200) {
        navigate('/notes');
      } else if (data.status === 500) {
        toast({
          title: 'Error',
          description: 'Invalid Credentials',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = e =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const isError = input === '';

  useEffect(() => {
    if (errorStatus === 500) {
      toast({
        title: 'Error',
        description: 'Invalid Credentials',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } else if (errorStatus === 200) {
      toast({
        title: 'Success',
        description: 'Logged In Successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [errorStatus]);

  return (
    <FormControl
      isInvalid={isError}
      width={'16rem'}
      backgroundColor={'#22c35e'}
      color={'white'}
      padding={'1rem'}
      margin={'4rem auto'}
      borderRadius={'5px'}
    >
      <FormLabel>Email</FormLabel>
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        _placeholder={{ color: 'white', opacity: '0.5' }}
        value={input.email}
        onChange={handleInputChange}
      />
      <FormLabel>Password</FormLabel>
      <Input
        type="password"
        name="password"
        placeholder="Enter your password"
        _placeholder={{ color: 'white', opacity: '0.5' }}
        value={input.password}
        onChange={handleInputChange}
      />
      <Stack
        spacing={1}
        marginTop={'1rem'}
        direction="row"
        justifyContent={'center'}
      >
        <Button
          isLoading={loading}
          loadingText="Submitting"
          colorScheme="teal"
          size="sm"
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </Stack>
    </FormControl>
  );
};

export default Login;
