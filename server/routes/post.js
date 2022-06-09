const User = require('../model/user')
const getAuth = require('./validateToken')
const router = require('express').Router()

router.post('/post', getAuth, async (req, res) => {
    
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
        const savedText = await text.save();
        res.send({clipboard: savedText.clips});
    } catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;


    // const snippet = new Clips({
    //     text: req.body.text
    // })

    // try{
    //     const savedText = await snippet.save();
    //     const user = await User.findById(req.user);
    //     user.clips.push(savedText);
    //     user.save();
    //     res.send(savedText);
    // } catch(err){
    //     res.status(400).send(err); 
    // }