import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import { Container, Typography, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';

const Home = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get('http://localhost:8000/api/v1/contacts');
      setContacts(response.data);
    };

    fetchContacts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Contact Manager
      </Typography>
      <Search />
      <List>
        {contacts.map((contact) => (
          <Card key={contact._id} variant="outlined" style={{ margin: '10px 0' }}>
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={contact.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        Email: {contact.email}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="textPrimary">
                        Phone: {contact.phone}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default Home;
