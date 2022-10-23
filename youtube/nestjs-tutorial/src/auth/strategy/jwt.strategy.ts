import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get(JwtStrategy.JWT_SECRET)
        });
    }

    private static readonly JWT_SECRET = 'JWT_SECRET';

    validate(payload: object) {
        return payload;
    }
}

export default JwtStrategy;
