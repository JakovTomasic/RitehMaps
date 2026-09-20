import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import { AppModule } from './app.module';
import { ALLOWED_ORIGINS, MAX_REQUEST_BODY_SIZE } from './constants';

async function bootstrap() {
  // Nest's built-in JSON parser caps bodies at 100kb and a full map save is
  // already ~84kb, so it is turned off and re-added with room to grow. Without
  // this, saving silently starts failing with a 413 as the map fills out.
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: false });
  app.use(json({ limit: MAX_REQUEST_BODY_SIZE }));

  // One proxy hop (Vercel, Cloudflare) so req.ip is the real caller and rate
  // limiting counts the right address. Don't raise this number: every extra hop
  // is one more X-Forwarded-For entry a client is free to make up.
  app.set('trust proxy', 1);

  app.enableCors({
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });

  // Hosts inject the port they expect the app on; 3000 is only the local default.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
