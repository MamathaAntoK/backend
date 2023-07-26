const express = require('express');
const bcrypt = require('bcrypt');

const User = require('./user');
const employeedata = require('./user')
const router = express.Router();

const jwt=require('jsonwebtoken')





router.post('/authlogin', (req, res) => {
  const { username, password } = req.body;

  const token = jwt.sign({ username: req.body.username, password: req.body.password }, 'secret-key');

  console.log(req.body.username);
  console.log(req.body.password);

  // Send the token in the response
  if (username === 'admin@gmail.com' && password === 'admin123') {
    res.status(200).send({ message: 'Admin logged in Successful', token: token })
    console.log('Admin logged in Successful')
  } else if (username === 'user@gmail.com' && password == 'user1234') {
    res.status(200).send({ message: 'User logged in Successfully', token: token })
    console.log('User logged in Successfully')
  }



});



router.post("/add", async (req, res) => {
  try {
    //console.log(req.headers.authorization)
    console.log(req.body);
    const item = req.body;
    const newdata = await employeedata(item);
    newdata.save();
    res.status(200).json("POST Successful");
  } catch (error) {
    res.status(400).json("Cannot /POST data");
    console.log(`Cannot POST data`);
  }
})

router.get("/add",async (req,res)=>{
  try {
      let data = await employeedata.find({});
      res.set('Cache-Control', 'no-store');
      console.log(data)
      res.json({data:data,status:200}).status(201);
  } catch (error) {
       res.status(400).json({ message: "GET request CANNOT be completed" });       
  }
  
})


router.put("/add/:_id",async (req,res)=>{                               
  try
  {
      let id = req.params._id;
      let updateData = {$set: req.body};
      const updated = await employeedata.findByIdAndUpdate(id,updateData);  
      res.set('Cache-Control', 'no-store');                            
      res.status(200).json("UPDATE Successful");                                                                          
  }
  catch(error)
  {
      res.status(400).json("Cannot /UPDATE data");                            
      console.log(`Cannot POST data`);                               
  }
})

router.delete("/add/:_id",async (req,res)=>{
  try {
      let id = req.params._id;
      console.log(id);
      let data = await employeedata.findByIdAndRemove(id);
      res.json({data:data,status:200}).status(201);
  } catch (error) {
      res.status(400).json({ message: "DELETE request CANNOT be completed" });       
  }
})





module.exports = router;
