import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Session } from './Session';

@Entity()
export class Message {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@Column('text')
	type: string;
	@Column('text')
	value: string;
	@ManyToOne(() => Session)
	@JoinColumn()
	session: Session;
	@Column('date')
	creationDate: Date;

	constructor(type: string, value: string, session: Session) {
		this.type = type;
		this.value = value;
		this.session = session;
		this.creationDate = new Date();
	}
}
