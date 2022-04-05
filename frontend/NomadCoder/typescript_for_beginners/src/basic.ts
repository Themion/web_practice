/* interface human {
    name: string,
    age: number,
    gender: string
} */

class human {
    public name: string;
    private age: number;
    public gender: string;

    constructor(name: string, age: number, gender: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    public myInfo = (): string => {
        return `name: ${this.name}, age: ${this.age}, gender: ${this.gender}`
    }
}

const me: human = new human("Lee", 25, "male")

/* const sayHi = (person: human): string => { 
    return `name: ${person.name}, age: ${person.age}, gender: ${person.gender}`
} */

console.log(me.myInfo)

export {};