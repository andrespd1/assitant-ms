import { AppDataSource } from "../data-source"
import { Message } from "../entity/Message"
import { Session } from "../entity/Session"

const repository = AppDataSource.getRepository(Message) 

export const createMessage = async (session: Session, type: string, value: string): Promise<Message> => {
  return await repository.save(new Message(type, value, session))
}