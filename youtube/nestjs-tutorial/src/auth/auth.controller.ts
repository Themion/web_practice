import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() dto: AuthDTO) {
        return await this.authService.login(dto);
    }
    @Post('signup')
    async signup(@Body() dto: AuthDTO) {
        // console.log(dto);
        return await this.authService.signup(dto);
    }
}
