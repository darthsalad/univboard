// const User = require('../model/user')
// const getAuth = require('./validateToken')
const router = require('express').Router()

router.get('/clipboard', async (req, res) => {
    try {
        // navigator.clipboard.readText()
        // .then((text) => {
        //     res.status(200).send({data: text});
        //     console.log(text);
        // }).catch((err) => console.log(err));

        const clipboardItems = await navigator.clipboard.read();
        for (const clipboardItem of clipboardItems) {
            for (const type of clipboardItem.types) {
                const blob = await clipboardItem.getType(type);
                console.log(URL.createObjectURL(blob));
            }
        }

        res.status(200).send("successful");
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;