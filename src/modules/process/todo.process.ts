import { Service } from "typedi";
import { getCustomRepository } from "typeorm";
import Todo from "../entity/todo.entity";
import TodoRepository from "../repository/todo.repository";

@Service()
export default class TodoProcess {

    private readonly repository: TodoRepository = getCustomRepository(TodoRepository);

    async isTodoExists(id: number): Promise<Todo> {
        return await this.repository.findOne(id);
    }

}