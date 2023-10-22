import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoIntranetStrategy } from './auth/42-intranet.strategy';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule
    PassportModule.register({ defaultStrategy: '42-intranet' }),
  ],
})
export class AppModule {}