import AWS from "aws-sdk";

const s3 = new AWS.S3();

export async function uploadPictureToS3(key, body) {
  const result = await s3
    .upload({
      Key: key,
      Body: body,
      ContentType: "image/jpeg",
      ContentEncoding: "base64",
      Bucket: process.env.AUCTIONS_BUCKET_NAME,
    })
    .promise();

  return result;
}
