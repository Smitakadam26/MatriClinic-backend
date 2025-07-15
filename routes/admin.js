const express = require('express')
const router = express.Router()
const { getadmin, getadminbyId, signin, logout, postadmin } = require('../controller/admin');

router
    .route('/')
    .get(getadmin)
    .post(postadmin)

router.route('/:id').get(getadminbyId)
router.route('/login').post(signin)
router.route('/logout').get(logout)

module.exports=router;