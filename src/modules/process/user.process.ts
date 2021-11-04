import { LocalDate } from "@js-joda/core";
import { Service } from "typedi";
import { getCustomRepository } from "typeorm";
import { stringToLocalDate } from "../../utils/date.utils";
import User from "../entity/user.entity";
import UserRepository from "../repository/user.repository";

@Service()
export default class UserProcess {

    private readonly repository: UserRepository = getCustomRepository(UserRepository);

    async isUserExists(id: number): Promise<User> {
        return await this.repository.findOne(id);
    }

    async isBirthDateValide(birthDate: string): Promise<boolean> {
        if (stringToLocalDate(birthDate).isBefore(LocalDate.now())) return false;
        return true;
    }

    async isEmailUnique(email: string): Promise<boolean> {
        if (await this.repository.findByEmail(email)) return false;
        return true;
    }

    async isUserNameUnique(username: string): Promise<boolean> {
        if (await this.repository.findByUserName(username)) return false;
        return true;
    }

}