/**
 * Simple class
 */
class Employee {
    empName: string;
    empCode: number;

    constructor(name: string, code: number) {
        this.empName = name;
        this.empCode = code;
    }

    logDetails(): void {
        console.log(`empName: ${this.empName}, empCode: ${this.empCode}`);
    }
}

const employee = new Employee('maicon', 12);

employee.logDetails();

/**
 * Extends
 */
class SalesEmployee extends Employee {
    department: string;

    constructor(name: string, code: number, department: string) {
        super(name, code);

        this.department = department;
    }

    employeeDetails(): void {
        console.log(`
            empName    : ${this.empName},
            empCode    : ${this.empCode},
            departament: ${this.department}
        `);
    }
}

let emp = new SalesEmployee("John Smith", 123, "Sales");

emp.employeeDetails();

/**
 * Get / Set
 */
const fullNameMaxLength = 10;

class User {
    private _fullName: string;

    constructor(name: string) {
        this._fullName = name;
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }

        this._fullName = newName;
    }
}

let user = new User('Denis Chambers');

console.log('constructor', user.fullName)

user.fullName = "Bob Smith";

console.log('setter', user.fullName);