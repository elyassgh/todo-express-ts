import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { getCustomRepository } from "typeorm";
import { UserDto, UserUpdateDto } from "../dto/user.dto";
import User from "../entity/user.entity";
import UserRepository from "../repository/user.repository";


@Service()
export default class UserService {

    private readonly repository: UserRepository = getCustomRepository(UserRepository);

    public save = async (dto: UserDto): Promise<User> => {
        const user = plainToClass(User, dto, { exposeDefaultValues: true });
        return await this.repository.save(user);
    };

    public update = async (user: User, dto: UserUpdateDto): Promise<User> => await this.repository.save({ ...user, ...dto });

    public findAll = async (): Promise<User[]> => await this.repository.find();

    public findbyId = async (id: number, withTodos: boolean = false): Promise<User> => {
        return withTodos ? await this.repository.findOne(id, { relations: ["todos"] }) : await this.repository.findOne({ id });
    }

    public delete = async (user: User): Promise<User> => await this.repository.remove(user)
}