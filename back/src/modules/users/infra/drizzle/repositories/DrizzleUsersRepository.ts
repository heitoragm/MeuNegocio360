import { eq } from 'drizzle-orm';
import { inject, injectable } from 'tsyringe';
import type { Database } from '@shared/infra/database/drizzle/client';
import { User } from '@modules/users/domain/entities/User';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { users } from '../schema';

@injectable()
export class DrizzleUsersRepository implements IUsersRepository {
  constructor(
    @inject('Database')
    private readonly db: Database,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const [user] = await this.db.insert(users).values(data).returning();
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    return this.db.query.users.findFirst({ where: eq(users.id, id) });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.db.query.users.findFirst({ where: eq(users.email, email) });
  }

  async findAll(): Promise<User[]> {
    return this.db.select().from(users);
  }
}
