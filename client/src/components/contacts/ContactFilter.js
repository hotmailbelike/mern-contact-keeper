import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);
	const { filtered, filterContacts, clearFilter } = contactContext;

	const text = useRef('');

	const onChange = (event) => {
		if (text.current.value || text.current.value !== '') {
			filterContacts(event.target.value);
		} else {
			clearFilter();
		}
	};

	useEffect(() => {
		if (!filtered || filtered === null) {
			text.current.value = '';
		}
	}, [filtered]);

	return (
		<form>
			<input
				ref={text}
				type='text'
				placeholder='Filter Contacts...'
				onChange={onChange}
			/>
		</form>
	);
};

export default ContactFilter;
