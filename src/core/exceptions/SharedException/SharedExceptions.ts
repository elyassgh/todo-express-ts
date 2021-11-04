import HttpException from '../HttpException';

export class EntityNotFoundException extends HttpException {
  constructor(entity: string, id: string) {
    super(404, `${entity} with id ${id} is not found`);
  }
}

export class DuplicatedFieldException extends HttpException {
  constructor(field: string, value: string) {
    super(409, `field ${field} with value ${value} is duplicated`);
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(entity: string, value: string) {
    super(422, `enitity ${entity} with id ${value} is unprocessable`);
  }
}