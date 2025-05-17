import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
 
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
