//imports
const router = require('express').Router();
const ctrl = require('../controllers');

//routes
router.get('/',ctrl.quiz.index);
router.post('/',ctrl.quiz.new);
router.get('/:id',ctrl.quiz.show);
router.put('/:id',ctrl.quiz.update);
router.delete('/:id',ctrl.quiz.destroy);

//exports
module.exports = router;