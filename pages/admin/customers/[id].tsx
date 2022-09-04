import Head from 'next/head';
import Layout from '../../../components/layout/layout';
import Divider from '../../../components/divider/divider';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ErrorResponse, fetcher } from '../../../utils/api';
import { CustomerDetailsResponse } from '../../api/customers/[id]';

const CustomerDetailsPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data, error } = useSWR<CustomerDetailsResponse, ErrorResponse>(
		id ? `/api/customers/${Array.isArray(id) ? id[0] : id}` : null,
		fetcher
	);

	if (!id) {
		return <>Must provide a customer ID</>;
	}

	return (
		<Layout pageTitle="Customer">
			<Head>
				<title>Customer -- Local College Shop</title>
				<meta name="description" content="Rapid repair device service for local college" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Divider />

			{error ? (
				<div>{error.message}</div>
			) : !data ? (
				<div>Loading ...</div>
			) : !error && data ? (
				<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					<div className="px-4 py-5 sm:px-6 bg-gray-50">
						<h2 className="text-lg font-medium leading-6 text-gray-900">Customer Information</h2>
					</div>

					<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
						<dl className="sm:divide-y sm:divide-gray-200">
							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Name</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
									{data.firstName} {data.lastName}
								</dd>
							</div>

							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Email Address</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.emailAddress}</dd>
							</div>

							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Phone Number</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.phone}</dd>
							</div>

							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Address</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
									{data.streetAddress} {data.city} {data.state} {data.zipcode}
								</dd>
							</div>

							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Customer ID</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.id}</dd>
							</div>
						</dl>
					</div>
				</div>
			) : null}
		</Layout>
	);
};

export default CustomerDetailsPage;
