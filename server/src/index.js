import * as dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('DB connection established');
})
.catch((err)=>{
    console.log(err);
})




//Creating Prject Schema
const projectSchema = new mongoose.Schema({
    project_img:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    point_one:{
        type:String,
    },
    point_two:{
        type:String,
    },
    point_three:{
        type:String,
    },
    code_link:{
        type:String,
        required:true
    },
    live_link:{
        type:String,
        required:true
    }
},{tiimestamps:true});

const Project = mongoose.model('Project',projectSchema);

// POST request to create a project
app.post('/createproject', async (req, res) => {
    try {
      const bodyData = req.body;
      const proj = new Project(bodyData);
      const projData = await proj.save();
      res.send(projData);
    } catch (error) {
      res.send(error.message);
    }
});

// GET all projects
app.get('/getproj', async (req, res) => {
    try {
      const projData = await Project.find({});
      res.send(projData);
    } catch (error) {
      res.send(error);
    }
});

//GET single project
app.get('/getproj/:pid', async (req, res) => {
    try {
      const projId = req.params.pid;
      const projData = await Project.findById(projId);
      res.send(projData);
    } catch (error) {
      res.send(error);
    }
  });

//Delete single project
app.delete('/deleteproj/:pid', async (req, res) => {
    try {
      const projId = req.params.pid;
      const projData = await Project.findByIdAndDelete(projId);
      res.send(projData);
    } catch (error) {
      res.send(error);
    }
  });

app.get('/', (req,res)=>{
    res.send("This is working");
})
const PORT = process.env.PORT || 8000;
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
});