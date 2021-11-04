import { plainToClass } from "class-transformer";
import User from "modules/entity/user.entity";
import { Service } from "typedi";
import { getCustomRepository } from "typeorm";
import { TodoDto } from "../dto/todo.dto";
import Todo from "../entity/todo.entity";
import TodoRepository from "../repository/todo.repository";

@Service()
export default class TodoService {

    private readonly repository: TodoRepository = getCustomRepository(TodoRepository);

    public save = async (dto: TodoDto, user: User): Promise<Todo> => {
        const todo: Todo = plainToClass(Todo, { ...dto, user });
        return await this.repository.save(todo);
    }

    public update = async (todo: Todo, dto: TodoDto): Promise<Todo> => await this.repository.save({ ...todo, ...dto });

    public findById = async (id: number): Promise<Todo> => await this.repository.findOne(id);

    public findByUser = async (user: User): Promise<Todo[]> => await this.repository.findByUser(user);

    public findAll = async (): Promise<Todo[]> => await this.repository.find();

    public delete = async (todo: Todo): Promise<Todo> => await this.repository.remove(todo);

}