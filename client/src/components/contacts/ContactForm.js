import React, { useState, useContext, useEffect } from 'react';

import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);
	const {
		addContact,
		current,
		clearCurrent,
		errorMsg,
		setError,
		clearError,
		updateContact,
	} = contactContext;

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	});

	const { name, email, phone, type } = contact;

	const onChange = (event) =>
		setContact({ ...contact, [event.target.name]: event.target.value });

	const clearAll = () => {
		clearCurrent();
		clearError();
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (!name) {
			return setError('Contact Must have a name');
		} else if (!email && !phone) {
			return setError('Contact Must have at least an email or a phone number');
		}
		clearError();

		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}

		clearAll();
	};

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			});
		}
	}, [contactContext, current]);

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
			<input
				type='text'
				name='name'
				placeholder='Name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='email'
				name='email'
				placeholder='Email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				name='phone'
				placeholder='Phone'
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<input
				type='radio'
				name='type'
				value='personal'
				checked={type === 'personal'}
				onChange={onChange}
			/>
			Personal{' '}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === 'professional'}
				onChange={onChange}
			/>
			Professional
			<div>
				<input
					type='submit'
					value={current ? 'Update Contact' : 'Add Contact'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
			<div>
				<p style={{ color: 'red' }}>{errorMsg}</p>
			</div>
		</form>
	);
};

export default ContactForm;
