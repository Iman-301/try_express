const mongoose=require('mongoose');

const habitSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    frequency: {
        type: String,
        enum: ["daily", "weekly"],
        default: "daily"
    },
    streak:{
        type: Number,
        default: 0
    },
    lastCompleted: {
        type: Date,
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }


},
{timestamps: true}
);
module.exports=mongoose.model('Habit',habitSchema);