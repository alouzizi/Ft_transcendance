import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoIntranetStrategy } from './auth/42-intranet.strategy';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: '42-intranet' }),
  ],
  providers: [FortyTwoIntranetStrategy,AuthService],
  exports: [PassportModule],
})
export class AppModule {}