// Factory Decorator
// function logger(prefix: string) {
//     return (target) => {
//         console.log(`${target} - ${prefix}`);
//     }
// }


// @logger('isSealed')
// class Foo { }

// Class Decorator
// function setAPIVersion(apiVersion: string) {
//     return (constructor) => {
//         return class extends constructor {
//             version = apiVersion;
//         }
//     }
// }

// @setAPIVersion('1.0.8')
// class API { }

// console.log(new API());

// Property decorator
// function minPersonAge(minAge: number) {
//     return (target: any, key: string) => {
//         let val = target[key];

//         const getter = () => val;

//         const setter = (value: number) => {
//             if (value < 18) {
//                 throw new Error('Age must be over 18');
//             }

//             val = value;
//         };

//         Object.defineProperty(target, key, {
//             get: getter,
//             set: setter,
//         });
//     };
// }

// class Person {
//     // Precisa ser maior que 18
//     @minPersonAge(18)
//     age: number;

//     constructor(a: number) {
//         this.age = a;
//     }
// }

// console.log(new Person(17));

// Method decorator
function delay(ms: number) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            setTimeout(() => {
                originalMethod.apply(this, ...args);
            }, ms);

            return descriptor;
        }
    }
}

class Greeter {
    greeting: string;

    constructor(g: string) {
        this.greeting = g;
    }

    // Cumprimenta depois de um determiado tempo
    @delay(2000)
    greet() {
        console.log(this.greeting);
    }
}

const pessoa = new Greeter('Good morning!');
pessoa.greet();