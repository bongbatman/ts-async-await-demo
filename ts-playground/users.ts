export interface usersInterface {
    id: number | undefined;
    name: string | undefined;
    schoolId: number | undefined;
}
const user1: usersInterface = {
    id: 1,
    name: "Nishant",
    schoolId: 101
};
const user2: usersInterface = {
    id: 2,
    name: "Jessica",
    schoolId: 102
};

let users: Array<usersInterface> = [user1, user2];

export const getUser = (id: number) => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        // @ts-ignore
        const user = users.find((user) => user.id === id); // array function finds the match
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id: ${id}`);
        }

    });
};
