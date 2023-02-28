import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma.service";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docCfg = new DocumentBuilder()
    .setTitle("Three Dimensional Models Server API Reference")
    .build();

  const doc = SwaggerModule.createDocument(app, docCfg);
  SwaggerModule.setup("api", app, doc);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(618);
}
bootstrap();
