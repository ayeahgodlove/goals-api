const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalsController')

// router.get('/', getGoals);
// router.post('/', createGoal);

router.route('/').get(getGoals).post(createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;