import { User } from '../entities/User';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
}
