import React, { useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
	const contactContext = useContext(ContactContext);

	const { contacts, filtered } = contactContext;

	if (contacts.length === 0) {
		return <h4>Your Added Contacts will be displayed here...</h4>;
	}

	return (
		<Fragment>
			<TransitionGroup>
				{filtered
					? filtered.map((contact) => (
							<CSSTransition key={contact._id} timeout={500} classNames='item'>
								<ContactItem contact={contact}></ContactItem>
							</CSSTransition>
					  ))
					: contacts.map((contact) => (
							<CSSTransition key={contact._id} timeout={500} classNames='item'>
								<ContactItem contact={contact}></ContactItem>
							</CSSTransition>
					  ))}
			</TransitionGroup>
		</Fragment>
	);
};

export default Contacts;
