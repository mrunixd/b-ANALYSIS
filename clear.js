const fs = require('fs');

const jsonData =  '{"users":[],"financials":[]}';

const filePath = 'dbStore.json';


// Write the JSON string to the file
fs.writeFileSync(filePath, jsonData, 'utf-8');

console.log(`Data has been written to ${filePath}`);
