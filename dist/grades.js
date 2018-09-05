"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grades = [{
        id: 1,
        schoolId: 101,
        grade: 100
    },
    {
        id: 2,
        schoolId: 102,
        grade: 75
    },
    {
        id: 3,
        schoolId: 101,
        grade: 95
    }];
exports.getGrades = function (schoolId) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        var grade = grades.filter(function (grade) { return grade.schoolId === schoolId; });
        if (grade.length > 0) {
            resolve(grade);
        }
        else {
            reject("Unable to find grades with schoolId: " + schoolId);
        }
    });
};
