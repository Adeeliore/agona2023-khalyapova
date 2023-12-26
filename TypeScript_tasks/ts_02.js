"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logPerson = exports.persons = void 0;
exports.persons = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Jane Doe',
        age: 32,
        role: 'Administrator'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    },
    {
        name: 'Bruce Willis',
        age: 64,
        role: 'World saver'
    }
];
function logPerson(person) {
    if ('role' in person) {
        console.log(" - ".concat(person.name, ", ").concat(person.age, ", ").concat(person.role));
    }
    else {
        console.log(" - ".concat(person.name, ", ").concat(person.age, ", ").concat(person.occupation));
    }
}
exports.logPerson = logPerson;
exports.persons.forEach(logPerson);
