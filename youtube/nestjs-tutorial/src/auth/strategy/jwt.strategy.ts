import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        config: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get(JwtStrategy.JWT_SECRET)
        });
    }

    private static readonly JWT_SECRET = 'JWT_SECRET';

    async validate(payload: { sub: number, email: string; }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        });

        delete user.hash;
        return user;
    }
}

export default JwtStrategy;
