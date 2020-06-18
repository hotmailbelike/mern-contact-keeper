const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User.model');
const auth = require('../middleware/auth');
const Contact = require('../models/Contacts.model');

/* 
route:  GET api/contacts
desc:   Get all users' contacts
access: Private
*/
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ createdBy: req.user._id }).sort({ date: -1 });
		res.json(contacts);
	} catch (error) {
		console.log('err', error.message);
		res.status(500).json({ error });
	}
});

/* 
route:  POST api/contacts
desc:   Add new contact
access: Private
*/
router.post('/', auth, async (req, res) => {
	try {
		const contact = new Contact(req.body);
		contact.createdBy = req.user._id;
		await contact.save();
		res.json(contact);
	} catch (error) {
		console.log('err', error.message);
		res.status(500).json({ error });
	}
});

/* 
route:  PUT api/contacts/:id
desc:   Update a contact
access: Private
*/
router.put('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		//if contacts exits
		if (!contact) return res.status(404).json({ msg: `No such contact data found` });

		//check is contact is owned by user
		if (contact.createdBy.toString() !== req.user._id)
			return res.status(400).json({ msg: `Not Authorized` });

		contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
		res.json(contact);
	} catch (error) {
		console.log('err', error.message);
		res.status(500).json({ error });
	}
});

/* 
route:  DELETE api/contacts
desc:   Delete contact
access: Private
*/
router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		//if contacts exits
		if (!contact) return res.status(404).json({ msg: `No such contact data found` });

		//check is contact is owned by user
		if (contact.createdBy.toString() !== req.user._id)
			return res.status(400).json({ msg: `Not Authorized` });

		await Contact.findByIdAndRemove(req.params.id, { useFindAndModify: false });
		res.json({ msg: `Contact Removed` });
	} catch (error) {
		console.log('err', error.message);
		res.status(500).json({ error });
	}
});

module.exports = router;
