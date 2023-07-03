import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const About = () => {
  const { token, user } = useSelector(state => state.loginData);

  const navigate = useNavigate();
  return (
    <Card
      display={'flex'}
      flexDirection={'column'}
      width={'25rem'}
      backgroundColor={'#dd6b20'}
      color={'white'}
      margin={'4rem auto'}
    >
      <CardHeader fontSize={'2rem'} fontFamily={'Roboto Serif'}>
        About
      </CardHeader>
      <CardBody>
        <Text
          fontFamily={'Roboto Serif'}
          wordBreak={'break-word'}
          fontSize={'14px'}
        >
          Welcome to the about page for Ashrumochan's MERN Stack Notes
          Application! As the name suggests, this application is built using the
          MERN stack, which includes MongoDB, Express, React, and Node.js. The
          application is designed to help you organize your notes and keep them
          in one place. My name is Ashrumochan, and I am the creator of this
          application. As a software developer, I am passionate about building
          applications that solve real-world problems, and the MERN Stack Notes
          Application is one such solution. With this application, you can
          easily create, update, and delete notes.
        </Text>
        {token && (
          <Button marginTop={'2rem'} onClick={() => navigate('/notes')}>
            Back to Notes!
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default About;
