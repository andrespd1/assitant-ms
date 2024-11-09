import { Request, Response } from "express"
import { sessionByWhatsappId } from "../services/session-service";
import { createMessage } from "../services/messages-service";


export const setup = async (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === (process?.env?.WEBHOOK_VERIFY_TOKEN)) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    console.log('Error processing setup request')
    res.sendStatus(403);
  }
}

export const handler = async (req: Request, res: Response) => {
  const messageObj = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
  const business_phone_number_id =
      req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
  const session = await sessionByWhatsappId(business_phone_number_id);
  const message = await createMessage(session, messageObj?.type, messageObj?.text?.body);
}