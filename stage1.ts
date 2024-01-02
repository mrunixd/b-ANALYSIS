import { getData, setData, ErrorObject } from "./dataStore";
import HTTPError from 'http-errors';
import validator from 'validator';
const crypto = require('crypto');

function register(email: string, password: string): number | ErrorObject {
    const data = getData();
    
    if (!validator.isEmail(email)) {
        throw HTTPError(400, { error: 'Email is not a valid email address.'});
    }

    const foundUser = data.users.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (foundUser) {
        throw HTTPError(400, { error: 'Email address is already in use.'});
    } 

    const userId = createId();

    const user = { email: email, password: password, authUserId: userId };
    data.users.push(user);
    setData(data);
    return userId;
}

function storeInfo(
    authUserId: number,
    salary: number,
    rent: number,
    vehicle: number,
    food: number,
    memberships: number,
    insurance: number,
    debt: number
) {
    const data = getData();
    
    var userInfo = data.financials.find(user => user.authUserId === authUserId);

    const financials = {
        authUserId: authUserId,
        salary: salary,
        rent: rent, 
        vehicle: vehicle,
        food: food,
        memberships: memberships,
        insurance: insurance,
        debt: debt,
    }

    if (!userInfo) {
        data.financials.push(financials);
    } else {
        userInfo = financials;
    }

    setData(data);
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

  
export { register, login, hashPassword };