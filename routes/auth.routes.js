const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

const User = require('../models/User.model');
const auth = require('../middleware/auth');

const router = express.Router();

/* 
route:  GET api/auth
desc:   get logged in user data
access: Private
*/
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-password');
		if (!user) {
			return res.status(400).json({ err: 'User not found' });
		}
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ err });
	}
});

/* 
route:  POST  api/auth
desc:   Auth user & get token (log in)
access: Public
*/
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const payload = {
				user: {
					_id: user._id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: '28d',
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).json({ err });
		}
	}
);

module.exports = router;
