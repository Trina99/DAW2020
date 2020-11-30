var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

function student_body(body)
{
    return {
        "numero" : body['numero'],
        "nome"   : body['nome']  ,
        "git"    : body['git']   ,
        "tpc"    : [
            (body['tpc0'] == "on") ? 1 : 0,
            (body['tpc1'] == "on") ? 1 : 0,
            (body['tpc2'] == "on") ? 1 : 0,
            (body['tpc3'] == "on") ? 1 : 0,
            (body['tpc4'] == "on") ? 1 : 0,
            (body['tpc5'] == "on") ? 1 : 0,
            (body['tpc6'] == "on") ? 1 : 0,
            (body['tpc7'] == "on") ? 1 : 0
        ]
    };
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/students/register', function(req, res) {
  // Data retrieve
  res.render('newform', {});
});

router.get('/students/edit/:id', function(req, res) {
  // Data retrieve
  Student.lookUp(req.params.id)
    .then(data => res.render('editform', { student: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/students/:id', function(req, res) {
  // Data retrieve
  Student.lookUp(req.params.id)
    .then(data => res.render('student', { student: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.post('/student', function(req, res) {
  // Data retrieve
  // res.render('index', { title: 'Students App' });
  Student.insert(student_body(req.body))
  .then(data => { 
    Student.list()
    .then(data_all => {
      res.render('students', { list: data_all });
    })
    .catch(err1 => res.render('error', {error: err1}));
  })
  .catch(err2 => res.render('error', {error: err2}));
});

// POST Edit Student
router.post('/student/edit/:id', (req, res) => {
  // Data Update
  // console.log("edit student form")
  Student.edit(student_body(req.body))
  .then(data1 => { 
    Student.list()
    .then(data2 => {
      res.render('students', { list: data2 });
    })
    .catch(err1 => res.render('error', {error: err1}));
  })
  .catch(err2 => res.render('error', {error: err2}));
});

// POST Delete Student
router.post('/student/delete/:id', (req, res) => {
  // Data Deletion
  // console.log("delete")
  Student.delete(req.params.id)
  .then(data => {
      Student.list()
      .then(data2 => {
        res.render('students', { list: data2 });
      })
      .catch(err1 => res.render('error', {error: err1}));
  })
  .catch(err2 => res.render('error', {error: err2}));
});

module.exports = router;
