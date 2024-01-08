import { getData, setData, ErrorObject } from "./dataStore";
import HTTPError from 'http-errors';

interface Ratio {
    savings: number,
    spending: number,
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
