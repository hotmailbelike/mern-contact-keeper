import React, { useReducer } from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CLEAR_CONTACTS,
	SET_CONTACT_ERROR,
	CLEAR_CONTACT_ERROR,
	CONTACT_ERROR,
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		errorMsg: null,
		error: null,
		filtered: null,
		loading: true,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	//Get Contacts
	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');
			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (error) {
			console.log('getContacts -> error', error);
			dispatch({
				type: CONTACT_ERROR,
				payload:
					error.res || `Fatal Error! Please check if your data has been input correctly`,
			});
		}
	};

	//Add Contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (error) {
			console.log('addContact -> error', error);
			dispatch({
				type: CONTACT_ERROR,
				payload:
					error.res.msg ||
					`Fatal Error! Please check if your data has been input correctly`,
			});
		}
	};

	//Delete Contact
	const deleteContact = async (_id) => {
		try {
			await axios.delete(`/api/contacts/${_id}`);
			dispatch({ type: DELETE_CONTACT, payload: _id });
		} catch (error) {
			console.log('deleteContact -> error', error);
			dispatch({
				type: CONTACT_ERROR,
				payload:
					error.res || `Fatal Error! Please check if your data has been input correctly`,
			});
		}
	};

	//Clear all Contacts
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
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
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (error) {
			console.log('updateContact -> error', error);
			dispatch({
				type: CONTACT_ERROR,
				payload:
					error.res || `Fatal Error! Please check if your data has been input correctly`,
			});
		}
	};

	//Filter Contacs
	const filterContacts = (searchTerm) => {
		dispatch({ type: FILTER_CONTACTS, payload: searchTerm });
	};

	//Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	//Set Contact Error
	const setError = (msg) => {
		dispatch({ type: SET_CONTACT_ERROR, payload: msg });
	};

	//Clear Contact Error
	const clearError = () => {
		dispatch({ type: CLEAR_CONTACT_ERROR });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				errorMsg: state.errorMsg,
				error: state.error,
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
				getContacts,
				clearContacts,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
