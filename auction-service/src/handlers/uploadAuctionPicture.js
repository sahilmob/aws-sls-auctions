import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import createError from "http-errors";

import { getAuctionById } from "./getAuction";
import { uploadPictureToS3 } from "../lib/uploadPictureToS3";
import { setAuctionPicture } from "../lib/setAuctionPicture";

export async function uploadAuctionPicture(event) {
  const { id } = event.pathParameters;
  const auction = await getAuctionById(id);
  const base64 = event.body.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");

  try {
    const pictureUrl = await uploadPictureToS3(auction.id + ".jpg", buffer);
    const updatedAuction = await setAuctionPicture(id, pictureUrl);

    return {
      statusCode: 201,
      body: JSON.stringify(updatedAuction),
    };
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = middy(uploadAuctionPicture).use(httpErrorHandler());
