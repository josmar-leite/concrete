import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());

  //Open API
  const options = new DocumentBuilder()
    .setTitle('Desafio Concrete API')
    .setDescription('API do Desafio Concrete')
    .setVersion('1.0.0')
    .addTag('Desafio Concrete')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
