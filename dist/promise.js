"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("./users");
var grades_1 = require("./grades");
var getStatus = function (id) {
    var user = {
        id: undefined,
        name: undefined,
        schoolId: undefined
    };
    return users_1.getUser(id).then(function (tempUser) {
        user = tempUser;
        return grades_1.getGrades(tempUser.schoolId);
    }).then(function (grades) {
        var avg = 0;
        if (grades.length > 0) {
            //reduce runs expression on array result and sets it on for next callback
            avg = grades.map(function (grade) { return grade.grade; }).reduce(function (a, b) { return a + b; }) / grades.length;
        }
        return user.name + " has a " + avg + "% in the class.";
    });
};
/**
 * Using the promise as usual with then and catch
 */
users_1.getUser(2).then(function (user) {
    console.log(user.name);
}).catch(function (e) {
    console.log(e);
});
grades_1.getGrades(102).then(function (grade) {
    console.log(grade);
}).catch(function (e) {
    console.log(e);
});
getStatus(2).then(function (status) {
    console.log(status);
}).catch(function (e) { return console.log(e); });
