// interface User {
//     name: string;
//     age?: number;
// }

// interface LabeledValue {
//     id?: string | number;
//     size: number;
//     label: string;
//     tags: string[];
//     user: User;
//     getTag: (tag: string) => string;
// }

// function printLabel(labeledObj: LabeledValue) {
//     console.log(labeledObj.label);
// }

// interface User {
//     name: string;
//     age?: number;
// }

// interface LabeledValue {
//     id: string | number;
//     user: User;
// }

// let myObj: LabeledValue = {
//     id: 10,
//     user: {
//         name: 'Maicon'
//     },
// };

// printLabel(myObj);

// interface User {
//     readonly id: number;
//     name: string;
// }

// interface UserAddress extends User {
//     zipcode: string;
// }

// const address: UserAddress = {
//     id: 1,
//     name: 'Maicon',
//     zipcode: '05164110'
// }

interface User {
    readonly id: number;
    name: string;
}

class CreateUser implements User {
    id: number;
    name: string;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

const user = new CreateUser(10, 'Maicon Silva');