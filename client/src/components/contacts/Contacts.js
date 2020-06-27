import React, { useContext, Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
	const contactContext = useContext(ContactContext);

	const { contacts, filtered, getContacts, loading } = contactContext;

	useEffect(() => {
		getContacts();
	}, [loading]);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Your Added Contacts will be displayed here...</h4>;
	}
	return (
		<Fragment>
			{contacts !== null && !loading ? (
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
			) : (
				<Spinner></Spinner>
			)}
		</Fragment>
	);
};

export default Contacts;
