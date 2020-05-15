import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "us-west-2" });

async function sendMail(event, context) {
  const params = {
    Source: "sahil.hmob@hotmail.com",
    Destination: {
      ToAddresses: ["sahil.hmob@hotmail.com"],
    },
    Message: {
      Body: {
        Text: {
          Data: "Hello from SES!",
        },
      },
      Subject: {
        Data: "Test Mail",
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const handler = sendMail;
