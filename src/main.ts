import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('ya apteka info')
    .setDescription('The "YA APTEKA" informational API description')
    .setVersion('1.0')
    .addApiKey({ name: 'x-api-key', type: 'apiKey', in: 'header' }, 'x-api-key')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('explorer', app, document);

  try {
    const PORT = configService.getOrThrow('PORT');
    await app.listen(PORT);
    logger.log(`Info application started at port: ${PORT}`);
  } catch (e) {
    logger.fatal("Can't start the application", e.message);
  }
}
bootstrap();
