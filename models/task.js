const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema(
    {
        title:{
        type: String,
        required: true,
        trim: true
       } ,
       description: {
        type: String,
        trim: true,
       },
       status: {
        type: String,
        enum: ["pending","in-progress","completed"],
        default: "pending",
       },
       dueDate:{
        type: Date,
       },
       user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}


        
    },
    {timestamps: true}

);

module.exports=mongoose.model("Task",taskSchema);