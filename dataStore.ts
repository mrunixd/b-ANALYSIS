import fs from 'fs';

export interface Financial {
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
    financials: Financial;
}

export interface DataStore {
    Users: [];
}

function setData(data: DataStore) {
    fs.writeFileSync('./dbStore.json', JSON.stringify(data));
}

function getData(): DataStore {
    const dataString = fs.readFileSync('./dbStore.json');
    return JSON.parse(String(dataString));
}

export { setData, getData }; 