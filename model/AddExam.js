const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AddExam = new Schema({
  course_name: {type:String,default:null},
  exam_title: {type:String,default:null},
  paper_id: {type:String,default:null},
  exam_date_and_time: {type:String,default:null},
  exam_duration: {type:String,default:null},
  type_of_question:{type:String,default:null},
  total_question:{type:String,default:null},
  status:{type:String,default:"N/A"}

});


module.exports = mongoose.model("AddExam",AddExam);