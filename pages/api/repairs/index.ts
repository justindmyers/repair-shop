import { PrismaClient, Repair } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse<Repair[]>) {
	const repairRequests = await prisma.repair.findMany({
		include: {
			user: true,
			device: true,
			status: true,
		}
	});
	res.json(repairRequests);
}
