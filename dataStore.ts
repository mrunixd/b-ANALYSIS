import fs from 'fs';

export interface ErrorObject {
    error: string;
}

export interface Financial {
    authUserId: number;
    salaryBT: number;
    salaryAT: number;
    rent: number;
    vehicle: number;
    food: number;
    memberships: number;
    insurance: number;
    debt: number;
    remainder: number;
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