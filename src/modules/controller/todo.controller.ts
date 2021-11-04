import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { UnprocessableEntityException, EntityNotFoundException } from "../../core/exceptions/SharedException/SharedExceptions";
import Controller from "../../core/interfaces/controller.interface";
import validateDto from "../../core/middleware/dtoValidator.middleware";
import { TodoDto } from "../dto/todo.dto";
import TodoProcess from "../process/todo.process";
import UserProcess from "../process/user.process";
import TodoService from "../service/todo.service";

class Todocontroller implements Controller {

    public path = '/todos';
    public router = Router();

    private readonly service: TodoService = Container.get(TodoService);
    private readonly process: TodoProcess = Container.get(TodoProcess);
    private readonly userProcess: UserProcess = Container.get(UserProcess);

    constructor() {
        this.init();
        console.log("Todo controller initialized.");
    }

    private init() {
        this.router.post(`${this.path}/user/:id([0-9]*)`, /* authMiddleware,*/ validateDto(TodoDto), this.createTodo);
        this.router.put(`${this.path}/:id([0-9]*)`, /* authMiddleware,*/ validateDto(TodoDto), this.updateTodo);
        this.router.get(`${this.path}/:id([0-9]*)`, /* authMiddleware,*/ this.findById);
        this.router.get(`${this.path}/all`, /* authMiddleware,*/ this.findAll);
        this.router.get(`${this.path}/all/user/:id([0-9]*)`, /* authMiddleware,*/ this.findByUser);
        this.router.delete(`${this.path}/:id([0-9]*)`, /* authMiddleware,*/ this.deleteTodo);
    }


    private createTodo = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/todos/user/123
        const todoDto: TodoDto = request.body;
        const user = await this.userProcess.isUserExists(+request.params.id)
        if (!user)
            return next(new UnprocessableEntityException('user', request.params.id));
        response.status(201).send(await this.service.save(todoDto, user));
    }

    private updateTodo = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/todos/123
        const todo = await this.process.isTodoExists(+request.params.id)
        if (!todo)
            return next(new UnprocessableEntityException('todo', request.params.id));
        const todoDto: TodoDto = request.body;
        response.send(await this.service.update(todo, todoDto));
    }

    private findById = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/todos/123
        const todo = await this.process.isTodoExists(+request.params.id)
        if (!todo)
            return next(new EntityNotFoundException('todo', request.params.id));
        response.send(todo);
    }

    private findAll = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/todos/all/
        response.send(await this.service.findAll());
    }

    private findByUser = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/todos/all/123
        const user = await this.userProcess.isUserExists(+request.params.id)
        if (!user)
            return next(new UnprocessableEntityException('user', request.params.id));
        response.send(await this.service.findByUser(user));
    }

    private deleteTodo = async (request: Request, response: Response, next: NextFunction) => {
        // Expected : BASE_URL/todos/123
        const todo = await this.process.isTodoExists(+request.params.id)
        if (!todo)
            return next(new UnprocessableEntityException('todo', request.params.id));
        response.send(await this.service.delete(todo));
    }


}

export default Todocontroller;