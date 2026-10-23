import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { descriptor } from './lib/index.js';

/**
 * Standalone root module only: the service itself lives in
 * `descriptor.module` (see `src/lib`), this just keeps the standalone
 * process's `GET /` hello-world route next to it. Not part of the mountable
 * descriptor.
 */
@Module({
  imports: [descriptor.module.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
