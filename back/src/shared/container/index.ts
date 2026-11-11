import { container } from 'tsyringe';
import { db, Database } from '@shared/infra/database/drizzle/client';

import '@shared/providers';
import '@modules/users/container';

container.registerInstance<Database>('Database', db);
