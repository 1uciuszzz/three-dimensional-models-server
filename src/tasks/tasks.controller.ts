import { Controller, Get, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(":key")
  createTask(@Param("key") key: string) {
    return this.tasksService.createTask(key);
  }

  @Get(":key/:uploadId/part/:partNum")
  getUploadUrl(
    @Param("key") key: string,
    @Param("uploadId") uploadId: string,
    @Param("partNum") partNum: string
  ) {
    return this.tasksService.generateUploadUrl(key, uploadId, +partNum);
  }

  @Get(":key/:uploadId/merge")
  mergeMultiPartRequest(
    @Param("key") key: string,
    @Param("uploadId") uploadId: string
  ) {
    return this.tasksService.mergeMultiPart(key, uploadId);
  }
}