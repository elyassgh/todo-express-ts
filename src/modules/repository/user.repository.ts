import { EntityRepository, Repository } from "typeorm";
import User from "../entity/user.entity";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    findByEmail = async (email: string): Promise<User> => await this.findOne({ email });
    
    findByUserName = async (username: string): Promise<User> => await this.findOne({ username });

}

