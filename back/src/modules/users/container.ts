import { container } from 'tsyringe';
import { IUsersRepository } from './domain/repositories/IUsersRepository';
import { DrizzleUsersRepository } from './infra/drizzle/repositories/DrizzleUsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', DrizzleUsersRepository);
