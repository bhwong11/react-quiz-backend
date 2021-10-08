//imports
const router = require('express').Router();
const ctrl = require('../controllers');

//routes
router.get('/',ctrl.user.show);

//exports
module.exports = router;