import { getData, setData, ErrorObject } from "./dataStore";
import HTTPError from 'http-errors';

function calculateRemainder(authUserId: number) {
    const data = getData();
    const financials = data.financials.find(user => user.authUserId === authUserId);

    if (financials === undefined) {
        throw HTTPError(400, {error: "Financial details have not been correctly inputted"});
    }

    const expenses = financials.debt + financials.food + financials.insurance + financials.memberships + financials.rent + financials.salary + financials.vehicle;
    return financials.salary - expenses;
}

