// IncreaseLimitRequest.js
export default class IncreaseLimitRequest {
    constructor(requestedLimit, employmentStatus, monthlyIncome, maxAllowedLimit) {
        this.requestedLimit = requestedLimit;
        this.employmentStatus = employmentStatus;
        this.monthlyIncome = monthlyIncome;
        this.maxAllowedLimit = maxAllowedLimit;
    }
}
