import { inject, injectable } from 'tsyringe';
import type { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { User } from '../domain/entities/User';

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.findAll();
    return users.map(({ password: _, ...user }) => user);
  }
}
