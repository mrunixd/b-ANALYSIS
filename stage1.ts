import { getData, setData, ErrorObject } from "./dataStore";
import validator from 'validator';
const crypto = require('crypto');

function register(email: string, password: string): number | ErrorObject {
    const data = getData();
    
    if (!validator.isEmail(email)) {
        return { error: 'Email is not a valid email address.'};
    }

    const foundUser = data.users.find(user => user.email.toLowerCase === email.toLowerCase);
    if (foundUser != undefined) {
        return { error: 'Email address is already in use.'};
    } 

    const userId = createId();

    const user = { email: email, password: hashPassword(password), authUserId: userId };
    data.users.push(user);
    return userId;
}

function login(email: string, password: string): number | ErrorObject {
    const data = getData();

    const user = data.users.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        return { error: 'Email address is not linked to an existing account' };
    }

    if (user.password !== hashPassword(password)) {
        return { error: 'Incorrect Password' };
    }
    return user.authUserId;
}

function storeInfo(
    salary: number,
    rent: number,
    vehicle: number,
    food: number,
    memberships: number,
    insurance: number,
    debt: number
) {
    return 999;
}

function createId() {
    const data = getData();
    var id = Math.floor(Math.random() * 90000) + 10000;

    for (const user of data.users) {
        if (id === user.authUserId) {
            return createId();
        }
    }
    return id;
}

function hashPassword(password: string): string {
    const sha256Hash = crypto.createHash('sha256');
    sha256Hash.update(password);
    return sha256Hash.digest('hex');
  }
  