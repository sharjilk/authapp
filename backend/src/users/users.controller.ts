import {
  Controller,
  Body,
  Post,
  Get,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninUserDto } from './dtos/signin-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.schema';
import { AuthGuard } from '../guard/auth.guard';

/**
 * Controller to manage user authentication and user-related actions.
 * Provides endpoints for signup, signin, signout, getting current user,
 * retrieving user details, listing all users, and deleting a user.
 */
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  /**
   * Registers a new user and saves the user ID to the session.
   * @param {CreateUserDto} body - The data transfer object containing user registration details.
   * @param {any} session - The session object to store user ID after signup.
   * @returns {Promise<User>} The created user.
   */
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.name,
    );
    session.userId = user.id;

    return user;
  }

  /**
   * Retrieves the currently authenticated user based on the session.
   * Protected by AuthGuard to ensure only authenticated users can access.
   * @param {User} user - The current user object from session.
   * @returns {User} The authenticated user's details.
   */
  @Get('/currentuser')
  //@UseGuards(AuthGuard)
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  /**
   * Signs out the current user by clearing the user ID from the session.
   * @param {any} session - The session object to clear the user ID.
   */
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  /**
   * Authenticates a user and saves the user ID to the session upon successful login.
   * @param {SigninUserDto} body - The data transfer object containing user login details.
   * @param {any} session - The session object to store user ID after signin.
   * @returns {Promise<User>} The authenticated user.
   */
  @Post('/signin')
  async signin(@Body() body: SigninUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;

    return user;
  }
}
