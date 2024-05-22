import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Search from './Search';

const Home = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
        const response = await axios.get(`http://localhost:8000/api/v1/contacts`);
        setContacts(response.data);
        };

        fetchContacts();
    }, []);


    return (
        <>
            <h1>Contact Manager</h1>
            <Search />
            <ul>
                {contacts.map((contact) => (
                <li key={contact._id}>
                    {contact.name} - {contact.email} - {contact.phone}
                </li>
                ))}
            </ul>
        </>
    )
}

export default Home