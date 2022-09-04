import { useRef, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { Controller, useForm } from 'react-hook-form';
import { CreateRequestForm } from '../../types';
import Layout from '../../components/layout/layout';
import Divider from '../../components/divider/divider';
import Input from '../../components/input/input';
import SplitForm from '../../components/split-form/split-form';
import ComboBox from '../../components/combo-box/combo-box';
import Router from 'next/router';

const manufacturers: { id: number; name: string }[] = [
	{ id: 1, name: 'Apple' },
	{ id: 2, name: 'Google' },
	{ id: 3, name: 'Samsung' },
	{ id: 4, name: 'Dell' },
];

const CreatePage: NextPage = () => {
	const [pageError, setPageError] = useState<string>();
	const pageErrorRef = useRef<HTMLDivElement>(null);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<CreateRequestForm>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
	});

	const handleOnSubmit = async (data: CreateRequestForm) => {
		setPageError(undefined);

		try {
			const response = await fetch('/api/submit-request', {
				method: 'POST',
				body: JSON.stringify(data),
			});
			const submitResponse: { message: string } = await response.json();

			if (response.status !== 200) {
				console.log(response, submitResponse.message);
				setPageError(submitResponse.message);
				pageErrorRef.current?.focus();
				return;
			}

			Router.push('/confirmation');
		} catch (ex) {
			setPageError('Something is wrong with your request');
			pageErrorRef.current?.focus();
		}
	};

	return (
		<Layout pageTitle="Submit a Repair Request">
			<Head>
				<title>Submit a Repair Request -- Local College Shop</title>
				<meta name="description" content="Rapid repair device service for local college" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Divider />

			<div aria-live="assertive" tabIndex={-1} ref={pageErrorRef}>
				{pageError ? (
					<div className="px-6 py-3 mb-10 bg-red-600 bg-opacity-10 border border-red-600 rounded-lg">{pageError}</div>
				) : null}
			</div>

			<form onSubmit={handleSubmit(handleOnSubmit)}>
				<SplitForm title="Personal Information" description="Use a permanent address where you can receive mail.">
					<div className="grid grid-cols-6 gap-6">
						<div className="col-span-6 sm:col-span-3">
							<Input
								{...register('personal.firstName', { required: 'First Name is required' })}
								label="First Name"
								id="first-name"
								autoComplete="given-name"
								error={errors.personal?.firstName}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<Input
								{...register('personal.lastName', { required: 'Last Name is required' })}
								label="Last Name"
								id="last-name"
								autoComplete="family-name"
								error={errors.personal?.lastName}
							/>
						</div>

						<div className="col-span-6 sm:col-span-4">
							<Input
								{...register('personal.emailAddress', { required: 'Email Address is requried' })}
								label="Email Address"
								id="email-address"
								autoComplete="email"
								error={errors.personal?.emailAddress}
							/>
						</div>

						<div className="col-span-6">
							<Input
								{...register('personal.streetAddress', { required: 'Street Address is required' })}
								label="Street Address"
								id="street-address"
								autoComplete="street-address"
								error={errors.personal?.streetAddress}
							/>
						</div>

						<div className="col-span-6 sm:?col-span-6 lg:col-span-2">
							<Input
								{...register('personal.city', { required: 'City is required' })}
								label="City"
								id="city"
								autoComplete="home city"
								error={errors.personal?.city}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<Input
								{...register('personal.state', { required: 'State / Province is required' })}
								label="State / Province"
								id="region"
								autoComplete="address-level1"
								error={errors.personal?.state}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<Input
								{...register('personal.zipcode', { required: 'Zipcode is required' })}
								label="Zip / Postal code"
								id="postal-code"
								autoComplete="postal-code"
								error={errors.personal?.zipcode}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<Input
								{...register('personal.mobilePhone', { required: 'Mobile phone is required' })}
								label="Mobile phone"
								id="mobile-phone"
								autoComplete="phone"
								error={errors.personal?.mobilePhone}
							/>
						</div>
					</div>
				</SplitForm>

				<Divider />

				<SplitForm title="Device Information" description="Enter the device information">
					<div className="grid grid-cols-6 gap-6">
						<div className="col-span-6 sm:col-span-3">
							<Input
								{...register('device.deviceType', { required: 'Device Type is required' })}
								label="Device Type"
								id="device-type"
								error={errors.device?.deviceType}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<Controller
								control={control}
								name="device.manufacturer"
								rules={{
									required: 'Device manufacturer is required',
								}}
								render={({ field }) => (
									<ComboBox
										{...field}
										label="Manufacturer"
										id="device-manufacturer"
										options={manufacturers}
										error={errors.device?.manufacturer}
									/>
								)}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<Input
								{...register('device.serialNumber', { required: 'Serial Number is required' })}
								label="Serial Number"
								id="device-serialNumber"
								error={errors.device?.serialNumber}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<Input
								{...register('device.modelNumber', { required: 'Model Number is required' })}
								label="Model Number"
								id="device-model-number"
								error={errors.device?.modelNumber}
							/>
						</div>
					</div>
				</SplitForm>

				<Divider />

				<div className="bg-gray-100 px-4 py-4 text-right sm:px-6 rounded-md">
					<button
						type="submit"
						className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
						Submit Request
					</button>
				</div>
			</form>
		</Layout>
	);
};

export default CreatePage;
