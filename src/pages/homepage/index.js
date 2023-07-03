import React from 'react';
import {
  Box,
  Textarea,
  Icon,
  Button,
  Center,
  Grid,
  Text,
  ButtonGroup,
  CardBody,
  CardHeader,
  Card,
} from '@chakra-ui/react';

const Homepage = () => {
  return (
    <Card
      display={'flex'}
      flexDirection={'column'}
      width={'25rem'}
      backgroundColor={'#ff000066'}
      color={'black'}
      margin={'4rem auto'}
    >
      <CardHeader fontSize={'2rem'} fontFamily={'Roboto Serif'}>
        Welcome to our Notes App!
      </CardHeader>
      <CardBody>
        <Text
          fontFamily={'Roboto Serif'}
          wordBreak={'break-word'}
          fontSize={'14px'}
        >
          Our app is designed to help you stay organized by creating and
          managing notes. With our MERN stack notes app, you can easily keep
          track of your thoughts, ideas, and to-do lists.Create new notes Edit
          existing notes Delete notes Access your notes from anywhere
        </Text>
      </CardBody>
    </Card>
  );
};

export default Homepage;
