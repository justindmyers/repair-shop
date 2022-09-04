import { PrismaClient, Repair } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}

	const body = JSON.parse(req.body);

	try {
		const user = await prisma.user.create({
			data: {
				emailAddress: body.personal.emailAddress,
				firstName: body.personal.firstName,
				lastName: body.personal.lastName,
				phone: body.personal.mobilePhone,
				streetAddress: body.personal.streetAddress,
				city: body.personal.city,
				state: body.personal.state,
				zipcode: body.personal.zipcode,
				device: {
					create: {
						type: body.device.deviceType,
						manufacturer: body.device.manufacturer,
						serialNumber: body.device.serialNumber,
						modelNumber: body.device.modelNumber,
					},
				},
			},
		});

		await prisma.repair.create({
			data: {
				description: 'description',
				user: {
					connect: {
						id: user.id,
					},
				},
				device: {
					connect: {
						id: user.id,
					},
				},
				status: {
					create: {
						status: 'Submitted',
						updatedDate: new Date(),
					},
				},
			},
			include: {
				user: true,
				device: true,
			},
		});
	} catch (ex: any) {
		console.log(ex);
		res.status(500).send({ message: ex });
		return;
	}

	res.status(200).send({ message: 'Repair successfully created' });
}
