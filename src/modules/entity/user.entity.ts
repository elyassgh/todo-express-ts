import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Todo from "./todo.entity";

@Entity({ name: 'users' })
class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    fullName: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    birthDate: string;

    @Column()
    password: string;

    @OneToMany(() => Todo, todo => todo.user)
    todos: Todo[];

}

export default User;