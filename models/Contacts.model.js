const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	name: {
		type: String,
		required: `Please Provide a name for your contact`,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	type: {
		type: String,
		default: 'personal',
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('contact', ContactSchema);
