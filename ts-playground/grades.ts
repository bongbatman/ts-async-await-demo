export interface gradesInterface {
    id: number;
    schoolId: number;
    grade: number;
}

const grades: Array<gradesInterface> = [{
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

export const getGrades = (schoolId: number | undefined) => {


    // @ts-ignore
    return new Promise<Array<gradesInterface>>((resolve, reject) => {
        const grade: Array<gradesInterface> = grades.filter((grade) => grade.schoolId === schoolId);

        if (grade.length > 0) {
            resolve(grade);
        } else {
            reject(`Unable to find grades with schoolId: ${schoolId}`);
        }

    });

};
