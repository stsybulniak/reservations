import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  getUserById(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  findByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: { username },
    });
  }

  create(createUserDto: AuthDto) {
    return this.prisma.user.create({ data: createUserDto });
  }
}
