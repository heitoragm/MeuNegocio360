import { container } from 'tsyringe';
import { IHashProvider } from './HashProvider/models/IHashProvider';
import { ScryptHashProvider } from './HashProvider/implementations/ScryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', ScryptHashProvider);
