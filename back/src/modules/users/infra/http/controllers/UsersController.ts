import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});

export class UsersController {
  async create(req: Request, res: Response): Promise<void> {
    const data = createUserSchema.parse(req.body);
    const user = await container.resolve(CreateUserService).execute(data);
    res.status(201).json(user);
  }

  async index(_req: Request, res: Response): Promise<void> {
    const users = await container.resolve(ListUsersService).execute();
    res.json(users);
  }
}
