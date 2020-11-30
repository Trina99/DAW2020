// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.lookUp = id => {
    return Student
        .findOne({numero: id})
        .exec()
}

module.exports.insert = student => {
    var newStudent = new Student(student)
    return newStudent.save()
}

module.exports.edit = (data) => {
    return Student
        .update({"numero": data['numero']},{$set : data})
        .exec();
}

module.exports.delete = (id) => {
    return Student
        .remove({numero : id})
        .exec();
}
