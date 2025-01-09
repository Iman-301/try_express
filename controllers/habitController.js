const Habit=require('../models/habit');

exports.getHabits=async (req,res)=>{
    try{
        const habits=await Habit.find({user: req.user});
        res.status(200).json(habits)
    }
    catch(err){
        res.status(500).json({err: 'failed to fetch'});
    }
}

exports.markHabitComplete=async (req,res)=>{
    try{
       const habit=await Habit.findById(req.params.id) 
       if (!habit || habit.user.toString() !==req.user){
        return res.status(404).json({error: "habit not found"});
       }
       const today=new Date()
       const lastCompleted=habit.lastCompleted ? new Date(lastCompleted) : null;

       if (lastCompleted && today.toDateString()===lastCompleted.toDateString()){
        return res.status(400).json({msg: "habit already completed."})
       }


       if (lastCompleted && (habit.frequency=='daily' && today-lastCompleted<=24 * 60 *60* 1000)){
        habit.streak+=1
       }
       else if (lastCompleted && (habit.frequency=='weekly' && today-lastCompleted<=7* 24* 60* 60 * 1000)){
        habit.streak+=1
       }
       else{
        habit.streak=1
       }

       habit.lastCompleted=today;
       await habit.save()
       res.status(200).json(habit);
    }
    
    catch(err){
        res.status(500).json({err: "couldnt mark"})
    }
}

exports.createHabit=async (req,res)=>{
    try{
    
        const newHabit=new Habit({... req.body, user: req.user});
        const saved=await newHabit.save();
        res.status(201).json(saved)
    }
    catch(err){
        res.status(400).json({err: "Couldnt create"});
    }
}
exports.updateHabitById=async (req,res) =>{
    try{
        const updatedHabit=await Habit.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedHabit){
            return res.status(404).json({msg: "no habit found"})
        }
        res.status(200).json(updatedHabit)
    }
    catch(err){
        res.status(400).json({err: "couldnt update"});
    }
}

exports.deleteById=async (req,res)=>{
   try{
    const deleteTask=await Habit.findByIdAndDelete(req.params.id)
    if (!deleteTask){
        return res.status(404).json({error: "not found"});
    }
    res.status(200).json({msg: "deleted successfully."})
   }
   catch(err){
    res.status(400).json({error: "couldnt delete"});
}
}
