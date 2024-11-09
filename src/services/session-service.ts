import { IsNull } from "typeorm";
import { AppDataSource } from "../data-source";
import { Session } from "../entity/Session";

const repository = AppDataSource.getRepository(Session);

export const sessionByWhatsappId = async (whatsappId: string): Promise<Session> => {
  const existingSession = await repository.findOne({where: {
    whatsappId,
    endDate: IsNull()
  }})
  if(existingSession)
    return existingSession;
  const newSession = new Session(whatsappId);
  return await repository.save(newSession);
}