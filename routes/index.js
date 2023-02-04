
const express = require('express');
const router = express.Router();
const AddExam = require("../model/AddExam");
const AddManual = require("../model/AddManual");
const multer = require("multer");
const salt = 10;
const newuser = require("../model/newuser");
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
let secret="1234"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//AddExam API
router.get('/AddExam',async (req, res,next) => {
     console.log("success",req.query.id);
     let searchfilter={};
    //  let val=req.query
     if(req.query.id){
      searchfilter._id=req.query.id
      
     }
     const isExist = await AddExam.find(searchfilter);
     res.send({ result: isExist });
});
router.post('/update-exam',async (req, res,next) => {
  console.log("successsgsdfsdv",req.body);
  const updateObj={};
  
  const data=req.body.addExamData;
  if(data.course_name){
    updateObj.course_name=data.course_name
  }
  if(data.exam_title){
    updateObj.exam_title=data.exam_title
  }
  if(data.paper_id){
    updateObj.paper_id=data.paper_id
  }
  if(data.exam_date_and_time){
    updateObj.exam_date_and_time=data.exam_date_and_time
  }
  if(data.exam_duration){
    updateObj.exam_duration=data.exam_duration
  }
  if(data.type_of_question){
    updateObj.type_of_question=data.type_of_question
  }
  if(data.total_question){
    updateObj.total_question=data.total_question
  }
  let searchfilter={};
  const isExist = await AddExam.updateOne({_id:data.id},{$set:updateObj});
  res.send({ result: "updated" });
});
router.post('/AddExam', async (req, res) => {
  console.log("req.body--->", req.body);
  const createData = await AddExam.create(req.body.addExamData);
  console.log("data--->", createData);
  if(createData){
    res.send({ isSuccess: true, success: "Add successfully",data:createData })

  }
  else {
    res.send({ isSuccess: false, success: "Something went wrong" })

  }
  // res.send({ isSuccess: true,Message:"AddExam SuccessFully"})

});
//AddManual API
router.get('/AddManual',async (req, res,next) => {
  console.log("success",AddManual);
  const isExist = await AddManual.find({});
  res.send({ result: isExist });
});
router.post('/AddManual', async (req, res) => {
console.log("req.body--->", req.body);
const createData = await AddManual.create(req.body.addManualData);
console.log("data--->", createData);
res.send({ isSuccess: true })

});
//sign up API
router.post('/signup', async (req, res, next) => {
  const { username, email, password} = req.body;
  console.log("29-->", req.body)
  const isExist = await newuser.findOne({ email: email });
  if (isExist) {
    res.send({ Error: "User already Exist" });
  } else {
    bcryptjs.genSalt(salt, async function (err, salt) {
      bcryptjs.hash(password, salt, async function (err, hash) {
        // Store hash in your password DB.

        const data = {
          username: username,
          email: email,
          password: hash,
        }
        const createData = newuser.create(data);
        if (createData) {
          res.send({ success: 'Signup Successfully' })
        };
      });
    });
  }
});
// Login Api
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body.LoginData;
  console.log("data ", email);
  const isExist = await newuser.findOne({ email: email });
  if (isExist) {
    // Load hash from your password DB.
    bcryptjs.compare(password, isExist.password, function (err, result) {
      // result == true
      if (result) {
        const token = jwt.sign({
          data: isExist._id
        }, secret, { expiresIn: 60 * 60 });
        console.log("token-->", token);
        res.send({ success: 'logged in success', token: token })
      } else {
        res.send({ error: 'password not match' });
      }
    });

  } else {
    res.send({ error: 'user not found' });
  }

});
//Delete API

router.post('/delete-AddExam', async (req, res) => {
  const id = JSON.parse(JSON.stringify(req.body.id));
  console.log("id--->",id);
  const delResponse = await AddExam.remove({ _id: id });
  if (delResponse) {
    res.send({ isSuccess: true, success:"User has deleted successfully" })
  } else {
    res.send({ isSuccess: false, success:"Something went wrong" })

  }
});
// File Upload Api
router.use('/images',express.static(__dirname + './images'));
const fileStorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')   
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '--' + file.originalname)      
    }
})
const upload = multer({ storage: fileStorageEngine });
router.post('/fileupload', upload.single('image'), (req, res) => {
  //here your other task.
  console.log(req.file);
  res.send("fileupload successfully")
});

router.post('/delete-AddManual', async (req, res) => {
  const id = JSON.parse(JSON.stringify(req.body.id));
  console.log("id--->",id);
  const delResponse = await AddManual.remove({ _id: id });
  if (delResponse) {
    res.send({ isSuccess: true, success:"User has deleted successfully" })
  } else {
    res.send({ isSuccess: false, success:"Something went wrong" })

  }
});
//Delete AddExam API

router.post('/delete-AddExam', async (req, res) => {
  const id = JSON.parse(JSON.stringify(req.body.id));
  console.log("id--->",id);
  const delResponse = await AddExam.remove({ _id: id });
  if (delResponse) {
    res.send({ isSuccess: true, success:"User has deleted successfully" })
  } else {
    res.send({ isSuccess: false, success:"Something went wrong" })

  }
});
//AddUpload

// Edit Api 


router.get('/edit-AddExam', async (req, res, next) => {
console.log("first")
  const id = req.query.id;
  console.log("id_edit-AddExam",id)

  const isExist = await AddExam.find({ _id: id });
  res.send({ result: isExist });
}
);
module.exports = router;
