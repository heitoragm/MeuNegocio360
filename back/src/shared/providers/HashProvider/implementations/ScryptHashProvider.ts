import { randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { IHashProvider } from '../models/IHashProvider';

const scrypt = promisify(scryptCb) as (password: string, salt: string, keylen: number) => Promise<Buffer>;
const KEY_LENGTH = 64;

export class ScryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derived = await scrypt(payload, salt, KEY_LENGTH);
    return `${salt}:${derived.toString('hex')}`;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    const [salt, key] = hashed.split(':');
    if (!salt || !key) return false;
    const derived = await scrypt(payload, salt, KEY_LENGTH);
    const stored = Buffer.from(key, 'hex');
    return stored.length === derived.length && timingSafeEqual(stored, derived);
  }
}
