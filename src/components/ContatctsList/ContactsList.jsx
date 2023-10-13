import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import {
  ContactListWrap,
  PhonebookList,
  PhonebookItem,
} from './ContactsList.styled';
import ContactsItem from 'components/ContactsItem/ContactsItem';
import { fetchContacts } from 'redux/operations';

const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = filter
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  return (
    <ContactListWrap>
      <PhonebookList>
        {filteredContacts.map(contact => (
          <PhonebookItem key={contact.id}>
            <ContactsItem contact={contact}></ContactsItem>
          </PhonebookItem>
        ))}
      </PhonebookList>
    </ContactListWrap>
  );
};

export default ContactList;
