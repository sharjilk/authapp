import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

/**
 * Mongoose schema representing a User document in the database.
 * Contains fields for name, email, and password.
 */
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
