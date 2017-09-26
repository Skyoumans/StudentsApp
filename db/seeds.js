const mongoose = require('mongoose');
const Schema = require("./schema.js");

mongoose.connect('mongodb://localhost/students');

const db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("database has been connected!");
});

const StudentModel = Schema.StudentModel;
const ProjectModel = Schema.ProjectModel;

// First we clear the database of existing students and projects.
StudentModel.remove({}, function (err) {
    console.log(err);
});

ProjectModel.remove({}, function (err) {
    console.log(err);
});

// Now, we will generate instances of a Student and of their Project.
const becky = new StudentModel({ name: "Becky", age: 29 });
const brandon = new StudentModel({ name: "Brandon", age: 29  });
const steve = new StudentModel({ name: "Steve", age: 29 });

const project1 = new ProjectModel({ title: "Project 1!!", unit: "JS" });
const project2 = new ProjectModel({ title: "Project 2!!", unit: "Express" });
const project3 = new ProjectModel({ title: "Project 3!!", unit: "React" });
const project4 = new ProjectModel({ title: "Project 4!!", unit: "Rails" });

// create two arrays that we can iterate over
const students = [becky, brandon, steve];
const projects = [project1, project2, project3, project4];

// Here we assign some projects to each student.
students.forEach(function (student, i) {
    student.projects.push(projects[i], projects[i + 1]);

    student.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }

        console.log(student);
    });
});

// Disconnect from database
db.close();