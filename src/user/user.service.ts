import { Injectable } from "@nestjs/common";
import User from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async create(name: string, password: string): Promise<User> {
        const user = new User();
        user.name = name;
        user.password = password;

        return await this.userRepository.save(user);
    }

    async findByUsername(name: string): Promise<User | undefined> {
        return this.userRepository.findWithEntryCount({ name });
    }

    async findOneById(id: number): Promise<User | undefined> {
        return this.userRepository.findWithEntryCount({ id });
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
}
