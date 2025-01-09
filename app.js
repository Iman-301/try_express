const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();

const taskRoutes=require('./routes/tasks');
const authRoutes = require('./routes/auth'); 
const habitRoutes=require('./routes/habits')


const app=express();
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDb"))
.catch((err)=>console.log("MongoDB connection error: ", err))

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/habits',habitRoutes);
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
