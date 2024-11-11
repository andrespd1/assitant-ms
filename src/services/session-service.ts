import { IsNull } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Session } from '../entity/Session';

const repository = AppDataSource.getRepository(Session);

export const sessionByWhatsappId = async (
	whatsappId: string,
): Promise<{ session: Session; isNewSession: boolean }> => {
	const existingSession = await repository.findOne({
		where: {
			whatsappId,
			endDate: IsNull(),
		},
	});
	if (existingSession) return { session: existingSession, isNewSession: false };
	const newSession = new Session(whatsappId);
	return { session: await repository.save(newSession), isNewSession: true };
};
