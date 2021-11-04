import { EntityRepository, Repository } from "typeorm";
import User from "../entity/user.entity";
import Todo from "../entity/todo.entity";


@EntityRepository(Todo)
export default class TodoRepository extends Repository<Todo> {

    findByUser = async (user: User): Promise<Todo[]> => this.find({ user });

}