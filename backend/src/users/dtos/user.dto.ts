import { Expose } from 'class-transformer';

/**
 * Data Transfer Object (DTO) for user information returned to the client.
 * Exposes specific fields of the user for controlled serialization.
 */
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
