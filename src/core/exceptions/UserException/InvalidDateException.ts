import HttpException from '../HttpException';

class InvalidDateException extends HttpException {
    constructor(repsentation: string, value: string) {
        super(400, `provided ${repsentation} (${value}), cannot surpass today`);
    }
}

export default InvalidDateException;