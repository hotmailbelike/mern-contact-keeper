const jwt = require('jsonwebtoken');
const config = require('config');

//append user data to req.body
module.exports = (req, res, next) => {
	//get token from header
	// const token = req.header('x-auth-token');
	//or we can get auth
	const token = req.header('Authorization').replace('Bearer ', '');

	//check if there is no token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ error: 'Invalid Token' });
	}
};
