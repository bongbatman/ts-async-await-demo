import {getUser, usersInterface} from "./users";
import {getGrades, gradesInterface} from "./grades";

const getStatus = (id: number) => {

    let user: usersInterface = {
        id: undefined,
        name: undefined,
        schoolId: undefined
    };
    return getUser(id).then((tempUser: usersInterface) => {
        user = tempUser;
        return getGrades(tempUser.schoolId);
    }).then((grades: Array<gradesInterface>) => {
        let avg = 0;
        if (grades.length > 0) {
            //reduce runs expression on array result and sets it on for next callback
            avg = grades.map((grade: gradesInterface) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        return `${user.name} has a ${avg}% in the class.`
    });
};
/**
 * Using the promise as usual with then and catch
 */
getUser(2).then((user: usersInterface) => {
    console.log(user.name);
}).catch((e: string) => {
    console.log(e);
});

getGrades(102).then((grade: Array<gradesInterface>) => {
    console.log(grade);
}).catch((e: string) => {
    console.log(e);
});

getStatus(2).then((status: string) => {
    console.log(status);
}).catch((e: string) => console.log(e));

