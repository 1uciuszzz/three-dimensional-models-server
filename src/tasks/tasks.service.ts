import { Injectable } from "@nestjs/common";
import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  ListPartsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PrismaService } from "src/prisma.service";
import * as dayjs from "dayjs";

@Injectable()
export class TasksService {
  private s3c: S3Client;
  private bucket: string = "three-dimensional-models";
  constructor(private prisma: PrismaService) {
    this.s3c = new S3Client({
      endpoint: "http://localhost:9000",
      credentials: {
        accessKeyId: "luciuszzz",
        secretAccessKey: "luciuszzz",
      },
      forcePathStyle: true,
      region: "ap-east-1",
    });
  }

  async createTask(key: string) {
    const uploadId = (
      await this.s3c.send(
        new CreateMultipartUploadCommand({
          Bucket: this.bucket,
          Key: key,
          Expires: dayjs().add(1, "day").toDate(),
        })
      )
    ).UploadId;
    return uploadId;
  }

  async generateUploadUrl(key: string, uploadId: string, partNum: number) {
    const url = await getSignedUrl(
      this.s3c,
      new UploadPartCommand({
        Bucket: this.bucket,
        Key: key,
        PartNumber: partNum,
        UploadId: uploadId,
      })
    );
    return url;
  }

  async mergeMultiPart(key: string, uploadId: string) {
    const partList = (
      await this.s3c.send(
        new ListPartsCommand({
          Bucket: this.bucket,
          Key: key,
          UploadId: uploadId,
        })
      )
    ).Parts;
    const parts = partList.map((item) => {
      return {
        PartNumber: item.PartNumber,
        ETag: item.ETag,
      };
    });
    const result = await this.s3c.send(
      new CompleteMultipartUploadCommand({
        Bucket: this.bucket,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: parts,
        },
      })
    );
    return result;
  }
}
