import { PrismaService } from '../prisma/prisma.service';
import { RegisterDTO } from './dto/register.dto';
import { ApiError } from '../../utils/api-error';
import { PasswordService } from '../password/password.service';

export class AuthService {
  private prisma: PrismaService;
  private passwordService: PasswordService;
  constructor() {
    this.prisma = new PrismaService();
    this.passwordService = new PasswordService();
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
}
