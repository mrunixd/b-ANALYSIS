import { getData, setData, ErrorObject } from "./dataStore";
import HTTPError from 'http-errors';

interface Ratio {
    savings: number,
    spending: number,
}
interface Taxes {
    taxPayable: number,
    taxPAYG: number,
    taxDescription: string,
}



function calculateRemainder(authUserId: number) {
    const data = getData();
    const financials = data.financials.find(user => user.authUserId === authUserId);

    if (financials === undefined) {
        throw HTTPError(400, {error: "Financial details have not been correctly inputted"});
    }

    const expenses = financials.debt + financials.food + financials.insurance + financials.memberships + financials.rent + financials.salary + financials.vehicle;
    financials.remainder = financials.salary - expenses;
    
    setData(data);
}

function calculateRatio(authUserId: number, percentageSavings: number, percentageSpending: number): Ratio {
    const data = getData();
    const financials = data.financials.find(user => user.authUserId === authUserId);

    if (financials === undefined) {
        throw HTTPError(400, {error: "Financial details have not been correctly inputed"})
    }
    return {
        savings: (percentageSavings / 100) * financials.remainder,
        spending: (percentageSpending / 100) * financials.remainder
    }
}

export function calculateTax(authUserId: number): Taxes {
    const data = getData();
    const financials = data.financials.find(finance => finance.authUserId === authUserId);
    if (financials === undefined) {
        throw HTTPError(400, {error: "Financial details have not been correctly inputed"})
    }
    const income = financials.salary;

    let tax = 0;
    let taxDescription = 'null';
    if (income <= 18200) {
        // to return;
        taxDescription = 'You are not required to pay tax with your given salary';
    } else if (income < 45000) {
        tax = (income - 18000)*.19;
        taxDescription = 'You fall in the first tax bracket and are required to pay 19c for every dollar over 18000';
    } else if (income < 120000) {
        tax = 5092 + (income - 45000)*0.325;
        taxDescription = 'You fall in the second tax bracket and are required to pay 32.5c for every dollar over 45000';
    } else if (income < 180000) {
        tax = 29467 + (income - 120000)*0.37;
        taxDescription = 'You fall in the third tax bracket and are required to pay 37c for every dollar over 120000';
    } else {
        tax = 51667 + (income - 180000)*0.45;
        taxDescription = 'You fall in the final tax bracket and are required to pay 45c for every dollar over 180000';
    }

    return {
        taxPayable: Number(tax.toFixed(2)),
        taxPAYG: Number((tax / 52).toFixed(2)),
        taxDescription: taxDescription,
    }
}