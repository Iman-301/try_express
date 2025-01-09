const express=require('express');
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware');

const {
    getHabits,
    createHabit,
    markHabitComplete,
    updateHabitById,
    deleteById
}=require('../controllers/habitController');

router.post('/',authMiddleware,createHabit);
router.get('/',authMiddleware,getHabits);
router.put('/:id',authMiddleware,updateHabitById);
router.put('/:id/complete',authMiddleware,markHabitComplete);
router.delete('/:id',authMiddleware,deleteById);

module.exports=router;


