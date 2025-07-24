import { PrismaService } from '../prisma/prisma.service';
import { RegisterDTO } from './dto/register.dto';
import { ApiError } from '../../utils/api-error';
import { PasswordService } from '../password/password.service';
import { JwtService } from '../jwt/jwt.service';

export class AuthService {
  private prisma: PrismaService;
  private passwordService: PasswordService;
  private jwtService: JwtService;
  constructor() {
    this.prisma = new PrismaService();
    this.passwordService = new PasswordService();
    this.jwtService = new JwtService();
  }

  register = async (body: RegisterDTO) => {
    const user = await this.prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user) {
      throw new ApiError('email already exists', 400);
    }

    const hashedPassword = await this.passwordService.hashPassword(
      body.password
    );

    return this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
      omit: { password: true },
    });
  };

  login = async (email: string, password: string) => {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ApiError('invalid credentials', 404);
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ApiError('invalid credentials', 401);
    }

    if (!isPasswordValid) {
      throw new ApiError('invalid credentials', 401);
    }

    const payload = { id: user.id };
    const accessToken = this.jwtService.generateToken(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: '2h' }
    );

    const { password: pw, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      accessToken,
    };
  };
}
