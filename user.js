const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

});

const employeeSchema = new Schema({
    name:  { type: String },
    position: { type: String},
    salary: { type:Number},
    
});

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('employeedata', employeeSchema);
