

import { S3Client } from "@aws-sdk/client-s3";
import 'dotenv/config'; 

const awsConfig = {
  credentials: {
    // accessKeyId: process.env.AWS_ACCESS_KEY,
    // secretAccessKey:  process.env.AWS_SECRET_ACCESSKEY,
  },
  region: "eu-north-1",
};

const s3Client = new S3Client(awsConfig);

export default s3Client;

