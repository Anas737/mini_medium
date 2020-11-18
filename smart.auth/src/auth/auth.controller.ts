import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from './dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async register(@Body() userData: RegisterUserDTO) {
    return await this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() userData: LoginUserDTO) {
    return await this.authService.login(userData);
  }
}
