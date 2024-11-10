import { IsEmail, IsString } from 'class-validator';

/**
 * Data Transfer Object (DTO) for signing in an existing user.
 * Validates that the email and password fields are correctly formatted.
 */
export class SigninUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
