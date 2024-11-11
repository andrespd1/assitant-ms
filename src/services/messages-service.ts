import axios from 'axios';
import { AppDataSource } from '../data-source';
import { Message } from '../entity/Message';
import { Session } from '../entity/Session';
import { FACEBOOK_API_URL, WHATSAPP_ASSET_ID } from '../utils/constants';

const repository = AppDataSource.getRepository(Message);

export const createMessage = async (
	session: Session,
	type: string,
	value: string,
): Promise<Message> => {
	return await repository.save(new Message(type, value, session));
};

export const sendMessage = async (
	phoneNumberId: number,
	type: string,
	specificType: string,
	options?: { [key: string]: any },
) => {
	const baseBody = {
		messaging_product: 'whatsapp',
		recipient_type: 'individual',
		to: phoneNumberId,
		type: type,
	};
	let body = {};
	switch (specificType) {
		case 'text':
			body = {
				...baseBody,
				text: {
					preview_url: options?.preview_url ?? false,
					body: options?.body ?? '',
				},
			};
			break;
		case 'flow':
			body = {
				...baseBody,
			};
			break;
		default:
			body = {
				...baseBody,
			};
			break;
	}
	axios.post(`${FACEBOOK_API_URL}/${WHATSAPP_ASSET_ID}/messages`, body, {
		headers: { Authorization: `Bearer ${process?.env?.GRAPH_API_TOKEN}` },
	});
};
