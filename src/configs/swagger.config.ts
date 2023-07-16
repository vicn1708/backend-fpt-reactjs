import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

const swagger = {
  register: (app: INestApplication) => {
    const config = new DocumentBuilder()
      .setTitle('ASM ReactJS')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  },
};

export default swagger;
