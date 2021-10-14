//imports
const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired')

//routes
router.get('/',authRequired,ctrl.user.show);
router.get('/all',authRequired,ctrl.user.index);
router.put('/:id',authRequired,ctrl.user.update);
router.delete('/:id',authRequired,ctrl.user.destroy);

//exports
module.exports = router;