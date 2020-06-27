import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT, REMOVE_All_ALERTS } from '../types';

const AlertState = (props) => {
	const initialState = [];

	const [state, dispatch] = useReducer(alertReducer, initialState);

	//Set Alert
	const setAlert = (msg, type, timeout = 5000) => {
		const id = uuidv4();
		dispatch({ type: SET_ALERT, payload: { msg, type, id } });

		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
	};

	//Remove All Alerts
	const removeAllAlerts = () => {
		dispatch({ type: REMOVE_All_ALERTS });
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert,
				removeAllAlerts,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
