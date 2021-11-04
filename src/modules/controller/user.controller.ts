import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { DuplicatedFieldException, EntityNotFoundException, UnprocessableEntityException } from "../../core/exceptions/SharedException/SharedExceptions";
import InvalidDateException from "../../core/exceptions/UserException/InvalidDateException";
import Controller from "../../core/interfaces/controller.interface";
import validateDto from "../../core/middleware/dtoValidator.middleware";
import UserProcess from "../../modules/process/user.process";
import UserService from "../../modules/service/user.service";
import { UserDto, UserUpdateDto } from "../dto/user.dto";

class UserController implements Controller {

    public path = '/users';
    public router = Router();

    private readonly service: UserService = Container.get(UserService);
    private readonly process: UserProcess = Container.get(UserProcess);

    constructor() {
        this.init();
    }

    private init() {
        this.router.post(`${this.path}/`, validateDto(UserDto), this.createUser);
        this.router.put(`${this.path}/:id([0-9]*)`, /* authMiddleware,*/ validateDto(UserUpdateDto), this.updateUser);
        this.router.get(`${this.path}/:id([0-9]*)`, /* authMiddleware,*/ this.findById);
        this.router.get(`${this.path}/all`, /* authMiddleware,*/ this.findAll);
        this.router.delete(`${this.path}/:id([0-9]*)`, this.deleteUser);
    }

    private createUser = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/users/
        const userDto: UserDto = request.body;
        if (!await this.process.isEmailUnique(userDto.email))
            return next(new DuplicatedFieldException('email', userDto.email));
        if (!await this.process.isUserNameUnique(userDto.username))
            return next(new DuplicatedFieldException('username', userDto.username));
        if (await this.process.isBirthDateValide(userDto.birthDate))
            return next(new InvalidDateException('birth date', userDto.birthDate));
        response.status(201).send(await this.service.save(userDto));
    }

    private updateUser = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/users/
        const user = await this.process.isUserExists(+request.params.id)
        if (!user)
            return next(new UnprocessableEntityException('user', request.params.id));
        const dto: UserUpdateDto = request.body;
        if (await this.process.isBirthDateValide(dto.birthDate))
            return next(new InvalidDateException('birth date', dto.birthDate));
        response.send(await this.service.update(user, dto));
    }

    private findById = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/users/123
        // Expected : BASE_URL/users/123?withTodos=true
        const user = await this.process.isUserExists(+request.params.id)
        const withTodos: boolean = request.query.withTodos == 'true';
        if (!user)
            return next(new EntityNotFoundException('user', request.params.id));
        response.send(await this.service.findbyId(+request.params.id, withTodos));
    }

    private findAll = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/users/all
        response.send(await this.service.findAll());
    }

    private deleteUser = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/users/123;
        const user = await this.process.isUserExists(+request.params.id)
        if (!user)
            return next(new UnprocessableEntityException('user', request.params.id));
        response.send(await this.service.delete(user));
    }

}

export default UserController;