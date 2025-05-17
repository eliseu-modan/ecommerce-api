import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @IsNotEmpty()
  @IsString()
  profilePic?: string;

  @IsNotEmpty()
  @IsString()
  role: string;
  
  @IsNotEmpty()
  @IsString()
  googleId?: string;

  @IsNotEmpty()
  @IsString()
  facebookId?: string;
}
