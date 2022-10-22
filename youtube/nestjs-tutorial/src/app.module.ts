import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        AuthModule,
        BookmarkModule,
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        UserModule,
    ]
})
export class AppModule { }
