import { Module } from '@nestjs/common';
import { FortyTwoStrategy } from './42.strategy';

@Module({
  providers: [FortyTwoStrategy],
  exports: [FortyTwoStrategy],
})
export class AuthModule {}