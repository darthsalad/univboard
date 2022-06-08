const router = require('express').Router()
const auth = require('./validateToken')

router.get('/history', auth , (req, res) => {
    res.json({
        history: [
            {
                text: "sample-text",
                date: Date.now()
            },
            {
                text: "sample-text 2",
                date: Date.now()
            }
        ]
    })
});

module.exports = router