import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    signToken(userId: number, email: string) {
        const payload = { sub: userId, email };
        const JWT_SECRET = 'JWT_SECRET';

        return this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get(JWT_SECRET)
        });
    }

    async signup(dto: AuthDTO) {
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            });

            delete user.hash;

            return user;
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) throw new ForbiddenException('Credentials Taken');
            throw error;
        }
    }

    async login(dto: AuthDTO) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (!user) throw new ForbiddenException('Credentials Incorrect');

        const pwMatch = await argon.verify(user.hash, dto.password);
        if (!pwMatch) throw new ForbiddenException('Credentials Incorrect');

        return { access_token: await this.signToken(user.id, user.email) };
    }
}
