import { Get, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksModule } from "./tasks/tasks.module";
import { ModelsModule } from "./models/models.module";

@Module({
  imports: [TasksModule, ModelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
