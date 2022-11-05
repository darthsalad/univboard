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
                text: req.body.text,
                owner: req.user.user
            }
        }
    },
    );

    try {
        // const savedText = await text.save();
        res.send("text copied to clipboard");
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/delete', getAuth, async (req, res) => {
    try {
        await User.findOneAndUpdate({
            _id: req.user.user
        },{
            $pull: {
                "clips": {
                    "_id": req.body.clip_id
                }
            }
        })
        const newVar = await User.find({
            _id: req.user.user
        })
        res.status(200).send({data: newVar[0].clips})
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
