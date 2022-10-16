import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login() {
        return this.authService.login();
    }
    @Post('signup')
    signup(
        @Body('username') username: AuthDTO['username'],
        @Body('password') password: AuthDTO['password'],
        @Body('test', ParseIntPipe) test: number,
    ) {
        console.log({ username, password, test });
        return this.authService.signup();
    }
}
