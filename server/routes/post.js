const User = require('../model/user')
const getAuth = require('./validateToken')
const router = require('express').Router()

router.post('/post', getAuth, async (req, res) => {
    //eslint-disable-next-line
    const text = await User.findOneAndUpdate(
        {
            _id: req.user.user
        }, {
            $push: {
                clips: {
                    text: req.body.text
                }
            }
        },
    );

    try {
        // const savedText = await text.save();
        res.send("text copied to clipboard");
    } catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;
