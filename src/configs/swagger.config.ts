import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

const swagger = {
  register: (app: INestApplication) => {
    const config = new DocumentBuilder()
      .setTitle('ASM ReactJS')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);
  },
};

export default swagger;
