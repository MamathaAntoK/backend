const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// const authRoutes = require('./auth');

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const bcrypt = require('bcrypt');

const User = require('./user');
const employeedata = require('./user')


const jwt=require('jsonwebtoken')


const path = require('path');
 app.use(express.static('./dist/frontend'));
 app.get('/*', function(req, res) {
res.sendFile(path.join(__dirname +
'/dist/frontend/index.html'));
 }); 


app.post('api/authlogin', (req, res) => {
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



app.post("api/add", async (req, res) => {
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

app.get("api/add",async (req,res)=>{
  try {
      let data = await employeedata.find({});
      res.set('Cache-Control', 'no-store');
      console.log(data)
      res.json({data:data,status:200}).status(201);
  } catch (error) {
       res.status(400).json({ message: "GET request CANNOT be completed" });       
  }
  
})


app.put("api/add/:_id",async (req,res)=>{                               
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

app.delete("api/add/:_id",async (req,res)=>{
  try {
      let id = req.params._id;
      console.log(id);
      let data = await employeedata.findByIdAndRemove(id);
      res.json({data:data,status:200}).status(201);
  } catch (error) {
      res.status(400).json({ message: "DELETE request CANNOT be completed" });       
  }
})


// function verifytoken(req, res, next) {
//   try {
//     if (!req.headers.authorization) throw 'Unauthorized';
//     const token = req.headers.authorization.split(' ')[1];
//     console.log(token)
//     if (!token) throw 'Unauthorized';
//     const payload = jwt.verify(token, 'secretKey');
//     console.log(payload)
//     if (!payload) throw 'Unauthorized';
//     next();
//   } catch (error) {
//     res.status(401).send('Error');
//   }
// }


mongoose
  .connect('mongodb+srv://username:password@cluster0.qlazmk7.mongodb.net/Databasename?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });


// app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});























































































































