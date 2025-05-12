import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dayjs from "dayjs";
import { envConfig } from "../../config/env";

export class AwsHelpers {
  private s3Client: S3Client;

  constructor() {
    const { S3_USER_KEY, S3_USER_SECRET, S3_BUCKET_REGION } = envConfig;

    if (!S3_USER_KEY || !S3_USER_SECRET) {
      throw new Error("S3 credentials are missing in envConfig.");
    }

    this.s3Client = new S3Client({
      region: S3_BUCKET_REGION,
      credentials: {
        accessKeyId: S3_USER_KEY,
        secretAccessKey: S3_USER_SECRET,
      },
    });
  }

  public getSignedUrl = async (fileName: string, fileType: string) => {
    const myBucket = envConfig.S3_BUCKET_NAME;
    const contentType = fileType;
    const signedUrlExpireSeconds = 60 * 5;
    const keyFile = `${dayjs().format("MM-DD-YYYY__HH-mm-ss")}_${fileName}`;

    const command = new PutObjectCommand({
      Bucket: myBucket,
      Key: keyFile,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: signedUrlExpireSeconds,
    });

    return { url: signedUrl, keyFile };
  };
}

export const awsHelpers = new AwsHelpers();
