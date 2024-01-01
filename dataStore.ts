import fs from 'fs';

export interface ErrorObject {
    error: string;
}

export interface Financial {
    authUserId: number;
    salary: number | void;
    rent: number | void;
    vehicle: number | void;
    food: number | void;
    memberships: number | void;
    insurance: number | void;
    debt: number | void;
}

export interface User { 
    email: string;
    password: string;
    authUserId: number;
}

export interface DataStore {
    users: User[];
    financials: Financial[];
}

function setData(data: DataStore) {
    fs.writeFileSync('./dbStore.json', JSON.stringify(data));
}

function getData(): DataStore {
    const dataString = fs.readFileSync('./dbStore.json');
    return JSON.parse(String(dataString));
}

export { setData, getData }; 