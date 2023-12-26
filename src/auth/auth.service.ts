import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

const EXPIRE_TIME = 20 * 1000; // ~5 hours
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const validatedUser = await this.validateUser(dto);

    const payload = {
      username: validatedUser.email,
    };

    return {
      success: true,
      user: validatedUser,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
        secret: process.env.JWT_REFRESH_KEY,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findUserByEmail(dto.username);

    if (!user)
      throw new UnauthorizedException('Username or password are not correct.');

    const passwordCompare = await compare(dto.password, user.password);

    if (passwordCompare) {
      const { password, employer_info, candidate_info, ...result } = user;

      if (!!candidate_info.length) {
        return {
          success: true,
          ...result,
          candidate_id: candidate_info[0].id,
          fullname: candidate_info[0].fullname,
          filled: user.candidate_info[0].filled,
        };
      } else {
        return {
          success: true,
          ...result,
          employer_id: employer_info[0].id,
          fullname: employer_info[0].fullname,
          filled: user.employer_info[0].filled,
        };
      }
    } else {
      throw new UnauthorizedException('Username or password are not correct.');
    }
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '5h',
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
        secret: process.env.JWT_REFRESH_KEY,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
