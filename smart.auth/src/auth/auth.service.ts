import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiService } from 'src/shared/api';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO, RegisterUserDTO } from './dto';
import { JwtPayload } from './payloads';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private apiService: ApiService,
    private configService: ConfigService,
  ) {}

  throwUserDoesntExit() {
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async register(userData: RegisterUserDTO): Promise<any> {
    userData.password = await bcrypt.hash(userData.password, 10);

    return this.apiService.post(`users`, userData);
  }

  async login(userData: LoginUserDTO): Promise<any> {
    const { username, password } = userData;

    const response = await this.apiService.get('users', {
      username,
    });

    if (!response['hydra:member']) this.throwUserDoesntExit();

    const user = response['hydra:member'][0];

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching)
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);

    const payload = { userId: user.id } as JwtPayload;
    const token = this.signPayload(payload);

    return {
      ...user,
      token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const userId = payload.userId;

    const user = await this.apiService.get(`users/${userId}`);

    if (!user) this.throwUserDoesntExit();

    return user;
  }

  signPayload(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('EXPIRES_IN'),
    });
  }
}
