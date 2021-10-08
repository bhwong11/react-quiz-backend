//imports
const router = require('express').Router();
const ctrl = require('../controllers');

//routes
router.post('/register',ctrl.auth.register);
router.post('/login',ctrl.auth.login);

//exports
module.exports = router;