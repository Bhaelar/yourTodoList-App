const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const List = require('../../models/List');
const User = require('../../models/User');

// @route   POST api/task
// @desc    Post task todo
// @access  Private

router.post('/', [ auth, [ check('task', 'Schedule a task to do later').not().isEmpty() ] ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { task } = req.body;

	try {
		const user = await User.findById(req.user.id).select('-password');

		list = new List({
			task,
			user: req.user.id
		});

		await list.save();
		res.json(list);
	} catch (err) {
		console.error(err.message);
	}
});

// @route   GET api/task
// @desc    Get tasks
// @access  Public

router.get('/', auth, async (req, res) => {
    try {
		const user = await User.findById(req.user.id).select('-password');

        const userList = await List.find({ user: req.user.id});

		if (!userList || userList.length < 1) {
			return res.status(400).json({
				msg: 'You have no scheduled tasks'
			});
		}

		res.json(userList); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/task/:id
// @desc    Update or edit scheduled task
// @access  Private
router.post('/:id', auth, async(req, res) => {
    try {
        await List.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, task) {
            if (err) return res.status(500).send("There was a problem updating the task.");
            res.status(200).send(task);
        });

    } catch (err) {
        console.error(err.message);
		res.status(500).send('Server Error');
    }
});

// @route   DELETE api/task/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, async(req, res) => {
    try {
        const task = await List.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                msg: 'Task not found'
            });
        }

        await task.remove();

        res.json({
            msg: 'Task removed'
        });

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: 'Task not found '
            });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
