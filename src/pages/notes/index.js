import React, { useEffect, useState } from 'react';
import {
  Box,
  Textarea,
  Icon,
  Button,
  Center,
  Grid,
  Text,
  ButtonGroup,
  Flex,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '../../constants/baseUrl';
import { handleChange } from '../login/assets/loginSlice';

const Notes = () => {
  const [notesValue, setNotesValue] = useState('');
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [notesID, setNotesID] = useState('');
  const [test, setTest] = useState(new Date().getSeconds());
  const { token, user, addRender, notesLength } = useSelector(
    state => state.loginData
  );
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        setNotes(data);
        dispatch(handleChange({ name: ' addRender', value: data.length }));
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddNotes = async () => {
    try {
      const response = await fetch(`${baseURL}/save`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: notesValue }),
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setNotes(data);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
    setEditMode(false);
    setNotesValue('');

    setTest(new Date().getSeconds());
    fetchData();
  };

  const handleEditNotes = async () => {
    try {
      const response = await fetch(`${baseURL}/update/${notesID}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: notesValue }),
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setNotes(data);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
    setEditMode(false);
    setNotesValue('');
  };

  const handleEdit = (notes, id) => {
    setNotesValue(notes);
    setEditMode(true);
    setNotesID(id);
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`${baseURL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // console.error(error);
    }
    fetchData();
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
    fetchData();
  }, [notesLength, editMode, test]);
  return (
    <Box>
      <Center marginTop={'4rem'} gap={'0.5rem'}>
        <Textarea
          placeholder="Notes"
          width={'50%'}
          height={'100px'}
          resize={'none'}
          backgroundColor={'#20acdd42'}
          fontFamily={'Roboto Serif'}
          value={notesValue}
          onChange={e => {
            setNotesValue(e.target.value);
          }}
        />
        <Button
          backgroundColor={'#20acdd'}
          color={'white'}
          _hover={{ color: 'black', backgroundColor: '#20acdd42' }}
          onClick={editMode ? handleEditNotes : handleAddNotes}
        >
          {editMode ? 'Edit Notes' : 'Add Notes'}
        </Button>
      </Center>

      <Box display={'flex'} justifyContent={'center'} marginTop={'4rem'}>
        <Grid
          gridTemplateColumns={'1fr 1fr '}
          justifyItems={'center'}
          alignItems={'center'}
          gridGap={'1rem'}
          padding={'1rem'}
        >
          {notes.length > 0 &&
            notes?.map(({ note, _id }, index) => {
              return (
                <Box
                  key={_id}
                  borderRadius={'1rem'}
                  backgroundColor={'#20acdd42'}
                  padding={'1rem'}
                  width={'17rem'}
                  display={'flex'}
                  flexDirection={'column'}
                  gap={'1rem'}
                  fontFamily={'Roboto Serif'}
                >
                  <Text>{note}</Text>
                  <ButtonGroup>
                    <Button
                      width={'100%'}
                      onClick={() => handleEdit(note, _id)}
                    >
                      Edit
                    </Button>
                    <Button width={'100%'} onClick={() => handleDelete(_id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </Box>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Notes;
