import 'reflect-metadata';
import { Request, Response, NextFunction, RequestHandler } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import HttpException from "../exceptions/HttpException";

function validateDto(type: any, skipMissingProperties = false): RequestHandler {

    return (request: Request, response: Response, next: NextFunction) => {

        const dtoObj = plainToClass(type, request.body, { excludeExtraneousValues: true, });
        request.body = dtoObj;
              
        validate(dtoObj, { skipMissingProperties })
            .then(
                (errors: ValidationError[]) => {
                    if (errors.length > 0) {
                        const dtoErrors = errors.map((error: ValidationError) =>
                            (Object as any).values(error.constraints)).join(", ");

                        next(new HttpException(400, dtoErrors));
                    } else {
                        next();
                    }
                }
            );

    }
}


export default validateDto;