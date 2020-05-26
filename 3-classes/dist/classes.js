"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Simple class
 */
var Employee = /** @class */ (function () {
    function Employee(name, code) {
        this.empName = name;
        this.empCode = code;
    }
    Employee.prototype.logDetails = function () {
        console.log("empName: " + this.empName + ", empCode: " + this.empCode);
    };
    return Employee;
}());
var employee = new Employee('maicon', 12);
employee.logDetails();
/**
 * Extends
 */
var SalesEmployee = /** @class */ (function (_super) {
    __extends(SalesEmployee, _super);
    function SalesEmployee(name, code, department) {
        var _this = _super.call(this, name, code) || this;
        _this.department = department;
        return _this;
    }
    SalesEmployee.prototype.employeeDetails = function () {
        console.log("\n            empName    : " + this.empName + ",\n            empCode    : " + this.empCode + ",\n            departament: " + this.department + "\n        ");
    };
    return SalesEmployee;
}(Employee));
var emp = new SalesEmployee("John Smith", 123, "Sales");
emp.employeeDetails();
/**
 * Get / Set
 */
var fullNameMaxLength = 10;
var User = /** @class */ (function () {
    function User(name) {
        this._fullName = name;
    }
    Object.defineProperty(User.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (newName && newName.length > fullNameMaxLength) {
                throw new Error("fullName has a max length of " + fullNameMaxLength);
            }
            this._fullName = newName;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
var user = new User('Denis Chambers');
console.log('constructor', user.fullName);
user.fullName = "Bob Smith";
console.log('setter', user.fullName);
