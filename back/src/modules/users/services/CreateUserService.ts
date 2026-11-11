import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import type { IHashProvider } from '@shared/providers/HashProvider/models/IHashProvider';
import type { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../domain/entities/User';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const existing = await this.usersRepository.findByEmail(email);
    if (existing) {
      throw new AppError('Email already in use', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const { password: _, ...user } = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
