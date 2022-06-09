const router = require('express').Router()
const user = require('../model/user');
const getAuth = require('./validateToken')

router.get('/history', getAuth , async (req, res) => {
    const history = await user.findById(
        {
            _id: req.user.user
        }
    )

    try {
        res.send(history.clips);
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;