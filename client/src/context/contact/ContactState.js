import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	SET_ERROR,
	CLEAR_ERROR,
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				_id: 1,
				name: 'Fish',
				email: 'fish@fishing.com',
				phone: '111-111-1111',
				type: 'personal',
			},
			{
				_id: 2,
				name: 'Watson',
				email: 'wat@son.com',
				phone: '111-111-1111',
				type: 'personal',
			},
			{
				_id: 3,
				name: 'sherlock',
				email: 'sher@lock.com',
				phone: '111-111-1111',
				type: 'professional',
			},
		],
		current: null,
		errorMsg: null,
		filtered: null,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	//Add Contact
	const addContact = (contact) => {
		contact._id = uuidv4();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	//Delete Contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	//Set Current Contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	//Clear Current Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//Update Contact
	const updateContact = (contact) => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};

	//Filter Contacs
	const filterContacts = (searchTerm) => {
		dispatch({ type: FILTER_CONTACTS, payload: searchTerm });
	};

	//Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	//Set Error
	const setError = (msg) => {
		dispatch({ type: SET_ERROR, payload: msg });
	};

	//Clear Error
	const clearError = () => {
		dispatch({ type: CLEAR_ERROR });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				errorMsg: state.errorMsg,
				filtered: state.filtered,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				setError,
				clearError,
				updateContact,
				filterContacts,
				clearFilter,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
