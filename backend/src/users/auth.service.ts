import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
/**
 * Service responsible for handling user authentication, including signup and signin processes.
 * Hashes and salts passwords for secure storage, and verifies user credentials on signin.
 */
export class AuthService {
  constructor(private userService: UsersService) {}

  /**
   * Registers a new user by creating a salted and hashed password, then saving the user in the database.
   * Throws an exception if the email is already in use.
   * @param {string} email - The email address of the user.
   * @param {string} password - The plain text password of the user.
   * @param {string} name - The name of the user.
   * @returns {Promise<User>} The created user.
   * @throws {BadRequestException} If the email is already registered.
   */
  async signup(email: string, password: string, name: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user = await this.userService.create(email, result, name);
    return user;
  }

  /**
   * Authenticates a user by verifying their email and password.
   * Throws an exception if the credentials are invalid.
   * @param {string} email - The email address of the user.
   * @param {string} password - The plain text password of the user.
   * @returns {Promise<User>} The authenticated user.
   * @throws {BadRequestException} If the credentials are invalid.
   */
  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
