import { PrismaClient, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export type CustomerDetailsResponse = User;

export default async function handle(req: NextApiRequest, res: NextApiResponse<CustomerDetailsResponse | { message: string }>) {
	const { id } = req.query;

	if (!Boolean(id) || Array.isArray(id) || typeof id === 'undefined') {
		res.status(400).send({ message: 'Invalid Request' });
		return;
	}

	const userRequests = await prisma.user.findUnique({
		where: {
			id: Number(id),
		}
	});

	if(!userRequests) {
		res.status(404).send({ message: 'Customer not found' });
		return;
	}

	res.json(userRequests);
}
