import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
        expiresIn: '5h',
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
        secret: process.env.JWT_REFRESH_KEY,
      }),
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findUserByEmail(dto.username);
    const passwordCompare = await compare(dto.password, user.password);

    if (user && passwordCompare) {
      const { password, employer_info, candidate_info, ...result } = user;

      if (!!candidate_info.length) {
        return {
          success: true,
          ...result,
          candidate_id: candidate_info[0].id,
        };
      } else {
        return {
          success: true,
          ...result,
          employer_id: employer_info[0].id,
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
    };
  }
}
