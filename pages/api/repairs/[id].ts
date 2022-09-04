import { Device, PrismaClient, Repair, Status, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export type RepairsDetailsResponse = Repair & {
    device: Device;
    user: User;
    status: Status;
};

export default async function handle(req: NextApiRequest, res: NextApiResponse<RepairsDetailsResponse | { message: string }>) {
	const { id } = req.query;

	if (!Boolean(id) || Array.isArray(id) || typeof id === 'undefined') {
		res.status(400).send({ message: 'Invalid Repair Request' });
		return;
	}

	const repairRequests = await prisma.repair.findUnique({
		where: {
			id: Number(id),
		},
		include: {
			user: true,
			device: true,
			status: true,
		}
	});

	if(!repairRequests) {
		res.status(404).send({ message: 'Repair not found' });
		return;
	}

	res.json(repairRequests);
}
