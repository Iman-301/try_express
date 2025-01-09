const Task=require('../models/task');
exports.getTasks=async (req,res)=>{
    try{
        const tasks=await Task.find({user: req.user});
        res.status(200).json(tasks);
    }
    catch(error){
        res.status(500).json({error: "Failed to fetch the tasks"})
    }
}

exports.getTaskById=async (req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        if (!task){
            return res.status(404).json({error: "Task not found"});
        }
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({error: "Failed to fetch"});
    }

}

exports.createTask=async (req,res)=>{
    try{
        const newTask=new Task({...req.body,user: req.user});
        const saveTask=await newTask.save();
        res.status(201).json(saveTask)
    }
    catch(err){
        res.status(400).json({error: "cannt create "})
    }
}

exports.updateTask=async (req,res)=>{
    try{
        const updatetask=await Task.findByIdAndUpdate(req.params.id,req.body)
        if (!updatetask){
            return res.status(404).json({error: 'Task nt found'});
        }
        res.status(200).json(updatetask);

    }
    catch(err){
        res.status(400).json({error: "Failded to update"})
    }
}

exports.deleteTask=async (req,res)=>{
    try{
        const deleteTask=await Task.findByIdAndDelete(req.params.id);
        if (!deleteTask){
            return res.status(404).json({error: "task not found"})
        }
        res.status(200).json({message: "Task deleted successfully"});
    }
    catch(err){
        res.status(400).json({error: "faild to delete"})
    }
}


















