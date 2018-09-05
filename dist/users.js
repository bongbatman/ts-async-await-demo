"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user1 = {
    id: 1,
    name: "Nishant",
    schoolId: 101
};
var user2 = {
    id: 2,
    name: "Jessica",
    schoolId: 102
};
var users = [user1, user2];
exports.getUser = function (id) {
    /**
     * Don't forget to assign return promise types to suppress warnings about incompatible types
     */
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        // @ts-ignore
        var user = users.find(function (user) { return user.id === id; }); // array function finds the match
        if (user) {
            resolve(user);
        }
        else {
            reject("Unable to find user with id: " + id);
        }
    });
};
