const express = require('express');
const path = require('path');

const connectDB = require('./config/db');

const app = express();

//Connect to Database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//don't need this anymore
// app.get('/', (req, res) => {
// 	res.json({ msg: 'Hello and welcome to Contact Keeper API ' });
// });

//Define routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/contacts', require('./routes/contacts.routes'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) =>
		res.sendfile(path.join(__dirname, 'client', 'build', 'index.html'))
	);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
