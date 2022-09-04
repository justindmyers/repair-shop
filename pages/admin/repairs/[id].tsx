import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../../../components/layout/layout';
import { ErrorResponse, fetcher } from '../../../utils/api';
import { RepairsDetailsResponse } from '../../api/repairs/[id]';
import Divider from '../../../components/divider/divider';

const RepairDetailsPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data, error } = useSWR<RepairsDetailsResponse, ErrorResponse>(
		id ? `/api/repairs/${Array.isArray(id) ? id[0] : id}` : null,
		fetcher
	);

	if (!id) {
		return <>Must provide a repair ID</>;
	}

	return (
		<Layout pageTitle="Repair Request">
			<Head>
				<title>Repair Request -- Local College Shop</title>
				<meta name="description" content="Rapid repair device service for local college" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<>
				<Divider />

				{error ? (
					<div>{error.message}</div>
				) : !data ? (
					<div>Loading ...</div>
				) : !error && data ? (
					<div className="md:grid md:grid-cols-3 md:gap-10">
						<div className="col-span-2">
							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-8">
								<div className="px-4 py-5 sm:px-6 bg-gray-50">
									<h2 className="text-lg font-medium leading-6 text-gray-900">Device Information</h2>
								</div>

								<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
									<dl className="sm:divide-y sm:divide-gray-200">
										<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Manufacturer</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.device.manufacturer}</dd>
										</div>

										<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Device Type</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.device.type}</dd>
										</div>

										<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Model Number</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.device.modelNumber}</dd>
										</div>

										<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Serial Number</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.device.serialNumber}</dd>
										</div>

										<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Problem Description</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.description}</dd>
										</div>
									</dl>
								</div>
							</div>
						</div>

						<div className="grid-cols-1">
							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-8">
								<div className="px-4 py-5 sm:px-6 bg-gray-50">
									<h2 className="text-lg font-medium leading-6 text-gray-900">Repair Information</h2>
								</div>

								<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
									<dl className="sm:divide-y sm:divide-gray-200">
										<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Status</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.status.status}</dd>
										</div>

										<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Last Updated</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
												{new Date(data.status.updatedDate).toDateString()}
											</dd>
										</div>
									</dl>
								</div>
							</div>

							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<div className="px-4 py-5 sm:px-6 bg-gray-50">
									<h2 className="text-lg font-medium leading-6 text-gray-900">Customer Information</h2>
								</div>

								<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
									<dl className="sm:divide-y sm:divide-gray-200">
										<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Name</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.user.firstName} {data.user.lastName}</dd>
										</div>

										<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Email</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
												{data.user.emailAddress}
											</dd>
										</div>
									</dl>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</>
		</Layout>
	);
};

export default RepairDetailsPage;
