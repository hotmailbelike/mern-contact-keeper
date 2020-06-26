import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null, //to determine if user is logged in
		user: null,
		loading: true,
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	//Load User (check which user is logged in)
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');

			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (error) {
			console.log('loadUser -> error', error);
			dispatch({ type: AUTH_ERROR });
		}
	};

	//Register User (Sign up)
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post('/api/users', formData, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (error) {
			console.log('resgister -> error', error);
			dispatch({
				type: REGISTER_FAIL,
				payload:
					error.response.data.msg ||
					'Fatal Error! Please Check if your information has been properly input',
			});
		}
	};

	//Login User
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post('/api/auth', formData, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (error) {
			console.log('resgister -> error', error);
			dispatch({
				type: LOGIN_FAIL,
				payload:
					error.response.data.msg ||
					'Fatal Error! Please Check if your information has been properly input',
			});
		}
	};

	//Logout
	const logout = () => dispatch({ type: LOGOUT });

	//Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				loading: state.loading,
				error: state.error,
				register,
				clearErrors,
				loadUser,
				login,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
