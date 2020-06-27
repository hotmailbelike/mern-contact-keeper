import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { register, error, clearErrors, isAuthenticated } = authContext;

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { name, email, password, confirmPassword } = user;

	const onChange = (event) =>
		setUser({ ...user, [event.target.name]: event.target.value });

	const onSubmit = (event) => {
		event.preventDefault();

		if (name === '' || email === '' || password === '') {
			return setAlert('Please enter all fields', 'danger');
		} else if (password !== confirmPassword) {
			return setAlert('Passwords do not match', 'danger');
		}

		register({ name, email, password });
	};

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/'); //redirect to dashboard
		}

		if (error) {
			setAlert(error, 'danger');
			clearErrors();
		}
	}, [error, isAuthenticated, props.history]);

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input type='text' name='name' value={name} onChange={onChange} required />
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email Address</label>
					<input type='email' name='email' value={email} onChange={onChange} required />
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={onChange}
						required
						minLength='6'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='confirmPassword'>Confirm Password</label>
					<input
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={onChange}
						required
						minLength={6}
					/>
				</div>
				<input type='submit' value='Register' className='btn btn-primary btn-block' />
			</form>
		</div>
	);
};

export default Register;
