import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import contactsList from '../../data/contacts.json';

import ContactForm from '../ContactForm/ContactForm';
import ContactFilter from '../ContactFilter/ContactFilter';
import ContactList from '../ContactList/ContactList';

export default function App() {

  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contactsList')) ?? contactsList);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contactsList', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const normalizedNameInput = name.toLowerCase();
    const matchByName = contacts.find(contact => contact.name.toLowerCase() === normalizedNameInput);

    if (matchByName) {
      alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      setContacts((contacts) => ([contact, ...contacts]));
    }
  };

  const changeFilter = event => {
    setFilter(filter => event.target.value);
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(normalizedFilter),
    );
  };

  const deleteContact = (contactId) => { 
    setContacts((contacts) => (contacts.filter(contact => contact.id !== contactId)));
  };
  
  return (
    <div className={css.Phonebook}>
      <h1 className={css.Phonebook__title}>Phonebook</h1>
      
      <ContactForm
        onSubmit={addContact}
      />

      <h2 className={css.Phonebook__title}>Contacts</h2>
      
      <ContactFilter
        filter={filter}
        onFilter={changeFilter}
      />
      
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
