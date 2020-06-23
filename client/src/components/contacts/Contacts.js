import React, { useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
	const contactContext = useContext(ContactContext);

	const { contacts, filtered } = contactContext;

	if (contacts.length === 0) {
		return <h4>Your Added Contacts will be displayed here...</h4>;
	}

	return (
		<Fragment>
			{filtered
				? filtered.map((contact) => (
						<ContactItem contact={contact} key={contact.id}></ContactItem>
				  ))
				: contacts.map((contact) => (
						<ContactItem contact={contact} key={contact.id}></ContactItem>
				  ))}
		</Fragment>
	);
};

export default Contacts;
