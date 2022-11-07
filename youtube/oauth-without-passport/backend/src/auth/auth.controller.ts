import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import axios from 'axios';
import { Response } from 'express';
import { decode } from 'node:querystring';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    private async getGithubUser(code: string) {
        const CLIENT_ID = this.configService.get('CLIENT_ID'),
            CLIENT_SECRET = this.configService.get('CLIENT_SECRET');

        const token = await this.httpService.axiosRef
            .post(
                `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
            )
            .then((res) => res.data)
            .catch((error) => {
                throw error;
            });

        const { access_token } = decode(token);

        const data = await this.httpService.axiosRef
            .get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            .then((res) => {
                console.log(res.data.id);
                console.log(typeof res.data.id);
                return res.data;
            })
            .catch((error) => {
                throw error;
            });

        return data;
    }

    @Get('github')
    async login(@Query() query, @Res() res: Response) {
        if (!query.path) query.path = '/';
        const { code, path } = query;
        const getGithubUser = await this.getGithubUser(code);

        console.log(getGithubUser);

        res.redirect(path);
    }
}
