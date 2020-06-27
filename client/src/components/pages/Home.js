import React, { useContext, useEffect } from 'react';

import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Home = () => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { loadUser } = authContext;
	const { removeAllAlerts } = alertContext;

	useEffect(() => {
		removeAllAlerts();
		loadUser();
	}, []);

	return (
		<div className='grid-2'>
			<div>
				<ContactForm></ContactForm>
			</div>
			<div>
				<ContactFilter></ContactFilter>
				<Contacts></Contacts>
			</div>
		</div>
	);
};

export default Home;
