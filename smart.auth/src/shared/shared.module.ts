import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiService } from './api/api.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ApiService],
  exports: [ApiService],
})
export class SharedModule {}
