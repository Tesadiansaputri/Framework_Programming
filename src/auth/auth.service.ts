import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { User } from './entities/users-entity.js';
import { LoginDto } from './dto/login.dto.js';
import { PasswordRecoveryDto } from './dto/password-recory.dto.js';
import { ForgetPasswordDto } from './dto/forget-password.dto.js';

@Injectable()
export class AuthService {
  // register
  register(registerDto: RegisterDto): User {
    const newUser: User = {
      id: 1,
      username: registerDto.username,
      email: registerDto.email,
      password: registerDto.password,
    };
    return newUser;
  }

  // login
  login(loginDto: LoginDto) {
    const newUser = new User();
    newUser.email = loginDto.email;
    newUser.password = loginDto.password;
    return newUser;
  }

  // forgot password
  forgotPassword(forgetPasswordDto: ForgetPasswordDto) {
    return `Forgot password endpoint for ${forgetPasswordDto.email}`;
  }

  // password recovery
  passwordRecovery(passwordRecoveryDto: PasswordRecoveryDto) {
    return `Password reset successful for ${passwordRecoveryDto.email}`;
  }
}