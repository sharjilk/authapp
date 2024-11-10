import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
/**
 * Service for handling user-related operations.
 * Provides methods for creating users, finding users by ID, and querying users by email.
 */
export class UsersService {
  /**
   * Initializes UsersService with the injected user model.
   * @param {Model<User>} userModel - The Mongoose user model.
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Creates a new user with the provided email, password, and name.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {string} name - The name of the user.
   * @returns {Promise<User>} The newly created user.
   */
  create(email: string, password: string, name: string) {
    const user = new this.userModel({ email, password, name });
    return user.save();
  }

  /**
   * Finds a user by their unique identifier.
   * Throws a NotFoundException if the user is not found or if the ID is invalid.
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<User | null>} The user with the specified ID, or null if not found.
   * @throws {NotFoundException} If the ID is invalid or the user is not found.
   */
  findOne(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new NotFoundException('User not found');
    }

    const user = this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Finds users based on the provided email.
   * Returns all users that match the specified email.
   * @param {string} email - The email to search for.
   * @returns {Promise<User[]>} The list of users matching the email.
   */
  find(email: string) {
    return this.userModel.find({ email });
  }
}
