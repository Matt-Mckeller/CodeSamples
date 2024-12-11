import { NestFactory } from '@nestjs/core';
import { GoogleModule } from './google.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(GoogleModule);
  const port = process.env.GEMINI_PORT;
  console.log('Started app on', 'http://localhost:' + port);
  await app.listen(port);
}
bootstrap();
