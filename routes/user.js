//imports
const router = require('express').Router();
const ctrl = require('../controllers');

//routes
router.get('/',ctrl.user.show);
router.put('/:id',ctrl.user.update);
router.delete('/:id',ctrl.user.destroy);

//exports
module.exports = router;