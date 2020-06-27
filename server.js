const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to Database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => {
// 	res.json({ msg: 'Hello and welcome to Contact Keeper API ' });
// });

//Define routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/contacts', require('./routes/contacts.routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
