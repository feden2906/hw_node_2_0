const db = require('../dataBase').getInstance();

module.exports = {
  findAllStudents: (filterObj) => {
    const Student = db.getModel(('Student'));

    return Student.findAll({ where: filterObj });
  },

  // filterStudents: (filterObj) => {
  //   const Student = db.getModel(('Student'));
  //
  //   return Student.find(filterObj);
  // },

  createStudent: (studentObj) => {
    const Student = db.getModel('Student');

    return Student.create(studentObj);
  }
};
