const User = require('../model/user')
const getAuth = require('./validateToken')
const router = require('express').Router()

router.post('/share', getAuth, async (req, res) => {
    try {
        const clipToShare = await User.find({
            _id: req.user.user,
            "clips._id": req.body.clip_id
        }, {
            "clips.$": 1,
        },
        async (err, docs) => {
            if(!err){
                await User.findOneAndUpdate(
                {
                    _id: req.body.user_id
                }, {
                    $push: {
                        clips: docs[0].clips
                    }
                });
            }
            else { console.log(err); }
        }).clone().catch((err) => console.log(err));

        const historyUser2 = await User.findOne({
                _id: req.body.user_id
        });

        res.status(200).send({
            clip: clipToShare,
            user2: historyUser2
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/users', getAuth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({ "users": users });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/delete_account', getAuth, async(req, res) => {
    try {
        await User.deleteOne({_id: req.user.user});
        res.status(200).send({data: "User successfully deleted"});
    } catch (err) {
        res.status(400).send(err);        
    }
});

module.exports = router;