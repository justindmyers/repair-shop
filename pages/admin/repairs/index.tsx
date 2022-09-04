import { Device, Repair, User } from '@prisma/client';
import Head from 'next/head';
import useSWR from 'swr';
import { fetcher } from '../../../utils/api';
import Layout from '../../../components/layout/layout';
import Divider from '../../../components/divider/divider';
import Link from 'next/link';

const RepairListingPage = () => {
	const { data, error } = useSWR<
		(Repair & {
			user: User;
		} & { device: Device })[]
	>('/api/repairs', fetcher);

	return (
		<Layout pageTitle="Repair Requests" subTitle="All repair requests in queue.">
			<Head>
				<title>Repair Request Listing -- Local College Shop</title>
				<meta name="description" content="Rapid repair device service for local college" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Divider />

			<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
				{error ? (
					<div>{error.message}</div>
				) : !data ? (
					<div>Loading ...</div>
				) : !error && data ? (
					<>
						{data.length ? (
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-gray-50">
									<tr>
										<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
											Customer Name
										</th>

										<th
											scope="col"
											className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Email
										</th>

										<th
											scope="col"
											className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Device Type
										</th>

										<th
											scope="col"
											className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Manufacturer
										</th>

										<th
											scope="col"
											className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Serial Number
										</th>

										<th
											scope="col"
											className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
											Model Number
										</th>
										<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>

								<tbody className="divide-y divide-gray-200 bg-white">
									{data.map((repair) => (
										<tr key={repair.id}>
											<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
												{repair.user.firstName} {repair.user.lastName}
												<dl className="font-normal lg:hidden">
													<dt className="sr-only sm:hidden">Email</dt>
													<dd className="mt-1 truncate text-gray-500 sm:hidden">{repair.user.emailAddress}</dd>
												</dl>
											</td>
											<td className="hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
												{repair.user.emailAddress}
											</td>
											<td className="hidden sm:table-cell px-3 py-4 text-sm text-gray-500">{repair.device.type}</td>
											<td className="hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
												{repair.device.manufacturer}
											</td>
											<td className="hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
												{repair.device.serialNumber}
											</td>
											<td className="hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
												{repair.device.modelNumber}
											</td>
											<td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
												<Link href={`/admin/repairs/${repair.id}`}>
													<a className="text-indigo-600 hover:text-indigo-900">
														Edit<span className="sr-only">, {repair.id}</span>
													</a>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>No Repair Requests Found</p>
						)}
					</>
				) : null}
			</div>
		</Layout>
	);
};

export default RepairListingPage;
