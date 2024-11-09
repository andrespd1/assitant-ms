import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session{
  @PrimaryGeneratedColumn("uuid")
  id: string
  @Column("date", {nullable: false})
  creationDate: Date
  @Column("text", {nullable: false})
  whatsappId: string
  @Column("date")
  endDate: Date
  @Column("text")
  endReason: string

  constructor(whatsappId: string){
    this.creationDate = new Date()
    this.whatsappId = whatsappId
  }
}