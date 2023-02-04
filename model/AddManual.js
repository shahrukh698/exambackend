const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AddManual = new Schema({
  course_name: {type:String,default:null},
  student_name: {type:String,default:null},
  enrolment_no: {type:String,default:null},
  branch: {type:String,default:null},
  semester: {type:String,default:null},
  email_id:{type:String,default:null},
  mobile_no:{type:String,default:null},
  password:{type:String,default:null},
  status:{type:String,default:"N/A"},
  excel:{type:String,default:null}
});


module.exports = mongoose.model("AddManual",AddManual);