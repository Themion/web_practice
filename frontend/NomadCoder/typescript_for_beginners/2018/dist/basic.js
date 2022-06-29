"use strict";
/* interface human {
    name: string,
    age: number,
    gender: string
} */
Object.defineProperty(exports, "__esModule", { value: true });
class human {
    constructor(name, age, gender) {
        this.myInfo = () => {
            return `name: ${this.name}, age: ${this.age}, gender: ${this.gender}`;
        };
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const me = new human("Lee", 25, "male");
/* const sayHi = (person: human): string => {
    return `name: ${person.name}, age: ${person.age}, gender: ${person.gender}`
} */
console.log(me.myInfo);
//# sourceMappingURL=basic.js.map