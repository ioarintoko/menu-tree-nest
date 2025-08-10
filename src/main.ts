/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS supaya bisa diakses dari Next.js
  // app.enableCors({
  //   origin: 'http://localhost:3000', // frontend
  //   credentials: true,
  // });

  app.enableCors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // allow both frontends
  credentials: true,
});


  // Prefix API, misal semua endpoint diawali /api
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  // Validasi otomatis dari DTO (class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Hapus field yang tidak ada di DTO
      forbidNonWhitelisted: true, // Error kalau ada field ilegal
      transform: true, // Auto-transform payload ke tipe DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
