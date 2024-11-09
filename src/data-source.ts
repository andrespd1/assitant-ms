import { DataSource } from "typeorm";
import { Session } from "./entity/Session";
import { Message } from "./entity/Message";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process?.env?.POSTGRES_HOST,
  port: 5432,
  username: process?.env?.POSTGRES_USER,
  password: process?.env?.POSTGRES_PASSWORD,
  database: process?.env?.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [Session, Message],
  subscribers: [],
  migrations: [],
})