import { Controller, Get, Param } from "@nestjs/common";
import { Reply } from "src/utils/Reply";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(":key")
  async createTask(@Param("key") key: string) {
    try {
      const object = await this.tasksService.getObject(key);
      if (object) {
        return Reply.success(undefined, undefined, {
          existed: true,
          record: object,
        });
      } else {
        return Reply.success(undefined, undefined, {
          existed: false,
          uploadId: await this.tasksService.createTask(key),
        });
      }
    } catch (error) {
      return Reply.failed();
    }
  }

  @Get(":key/:uploadId/part/:partNum")
  async getUploadUrl(
    @Param("key") key: string,
    @Param("uploadId") uploadId: string,
    @Param("partNum") partNum: string
  ) {
    try {
      return Reply.success(undefined, undefined, {
        url: await this.tasksService.generateUploadUrl(key, uploadId, +partNum),
      });
    } catch (error) {
      return Reply.failed();
    }
  }

  @Get(":key/:uploadId/merge")
  async mergeMultiPartRequest(
    @Param("key") key: string,
    @Param("uploadId") uploadId: string
  ) {
    try {
      return Reply.success(undefined, undefined, {
        record: await this.tasksService.mergeMultiPart(key, uploadId),
      });
    } catch (error) {
      return Reply.failed();
    }
  }
}
