declare var Promise: PromiseConstructor;

interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

type Person = User | Admin;

export type ApiResponse<T> = {
    status: 'success';
    data: T;
} | {
    status: 'error';
    error: string;
};

export function promisify<T>(original: (callback: (response: ApiResponse<T>) => void) => void): () => Promise<T> {
    return () => new Promise<T>((resolve, reject) => {
        original((response: ApiResponse<T>) => {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(new Error(response.error));
            }
        });
    });
}

export function promisifyAll(obj: { [key: string]: Function }): { [key: string]: Function } {
    const promisifiedObj: { [key: string]: Function } = {};
    for (const key in obj) {
        if (typeof obj[key] === 'function') {
            promisifiedObj[key] = promisify(obj[key] as (callback: Function) => void);
        }
    }
    return promisifiedObj;
}

const oldApi = {
    requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
        callback({
            status: 'success',
            data: [
                { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
                { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
            ]
        });
    },
    requestUsers(callback: (response: ApiResponse<User[]>) => void) {
        callback({
            status: 'success',
            data: [
                { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
                { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
            ]
        });
    },
    requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
        callback({
            status: 'success',
            data: Date.now()
        });
    },
    requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) {
        callback({
            status: 'error',
            error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
        });
    }
};

export const api = promisifyAll(oldApi);

function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

async function startTheApp() {
    try {
        console.log('Admins:');
        const admins = await api.requestAdmins();
        admins.forEach(logPerson);
        console.log();

        console.log('Users:');
        const users = await api.requestUsers();
        users.forEach(logPerson);
        console.log();

        console.log('Server time:');
        console.log(`   ${new Date(await api.requestCurrentServerTime()).toLocaleString()}`);
        console.log();

        console.log('Coffee machine queue length:');
        console.log(`   ${await api.requestCoffeeMachineQueueLength()}`);
    } catch (error) {
        console.error(`Error: "${error.message}", but it's fine, sometimes errors are inevitable.`);
    }
}

startTheApp().then(() => {
    console.log('Success!');
});
