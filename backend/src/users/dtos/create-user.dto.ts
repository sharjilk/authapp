import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a new user.
 * Validates that required fields are correctly formatted.
 */
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/[A-Za-z]/, {
    message: 'Password must contain at least one letter.',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number.' })
  @Matches(/[@$!%*?&]/, {
    message: 'Password must contain at least one special character (@$!%*?&).',
  })
  password: string;
}
