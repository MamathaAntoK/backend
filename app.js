const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect('mongodb+srv://username:password@cluster0.qlazmk7.mongodb.net/Employees?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });


const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  salary: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);


app.get('/employees', (req, res) => {
  Employee.find({}, (err, employees) => {
    if (err) {
      console.log('Error retrieving employees:', err)
      res.status(500).send('Error retrieving employees');
    } else {
      res.json(employees);
    }
  });
});


app.post('/employees', (req, res) => {
  const newEmployee = new Employee(req.body);

  newEmployee.save((err) => {
    if (err) {
      console.log('Error creating employee:', err);
      res.status(500).send('Error creating employee');
    } else {
      res.status(201).send('Employee created');
    }
  });
});


app.put('/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  Employee.findByIdAndUpdate(
    employeeId,
    req.body,
    { new: true },
    (err, updatedEmployee) => {
      if (err) {
        console.log('Error updating employee:', err);
        res.status(500).send('Error updating employee');
      } else {
        res.json(updatedEmployee);
      }
    }
  );
});


app.delete('/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  Employee.findByIdAndDelete(employeeId, (err) => {
    if (err) {
      console.log('Error deleting employee:', err);
      res.status(500).send('Error deleting employee');
    } else {
      res.send('Employee deleted');
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});























































































































