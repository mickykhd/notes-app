import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { baseURL } from '../../constants/baseUrl';

const Signup = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  const errorMessage =
    errorStatus === 400
      ? 'Please check all the fields'
      : errorStatus === 409
      ? 'Email already exists'
      : errorStatus === 201
      ? 'Successfull,Proceed With Log In'
      : '123';

  const handleSignup = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const url = `${baseURL}/register`;
      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const info = await data.json();
      setErrorStatus(data.status);

      console.log(data.status);

      setInput({ name: '', email: '', password: '' });
    } catch (error) {
      setErrorStatus(400);
      console.log(error);
    }
    setLoading(false);
    console.log('kkk', errorStatus);
  };
  useEffect(() => {
    if (errorStatus) {
      toast({
        title: errorMessage,
        status: errorStatus === 201 ? 'success' : 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [errorStatus]);

  const handleInputChange = e =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const isError = input === '';
  // console.log(process.env.BASE_URL);
  return (
    <FormControl
      isInvalid={isError}
      width={'16rem'}
      backgroundColor={'#22c35e'}
      color={'white'}
      padding={'1rem'}
      margin={'4rem auto'}
      borderRadius={'5px'}
      background={'#805ad5'}
    >
      <FormLabel>Name</FormLabel>
      <Input
        type="text"
        name="name"
        placeholder="Enter your name"
        _placeholder={{ color: 'white', opacity: '0.5' }}
        value={input.name}
        onChange={handleInputChange}
      />
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
          colorScheme="teal"
          size="sm"
          isLoading={loading}
          loadingText="Submitting"
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </Stack>
    </FormControl>
  );
};

export default Signup;
