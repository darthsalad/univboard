const User = require('../model/user')
const getAuth = require('./validateToken')
const router = require('express').Router()

router.get('/edit', getAuth, async (req, res) => {
    try {
        await User.findOneAndUpdate(
            {
                _id: req.user.user,
                "clips._id": req.body.clip_id
            }, {
                $set: {
                    "clips.$.text": req.body.text,
                }
            }
        );

        const newClip = await User.find(
            {
                _id: req.user.user,
                "clips._id": req.body.clip_id
            }, {
                "clips.$": 1,
            }
        )

        res.status(200).send({
            data: `Editted clip of id: ${req.body.clip_id}`, 
            newClip
        });
    } catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;