import React, { ReactNode, useId } from 'react';

export type SplitFormProps = {
	title: ReactNode | string;
	description?: ReactNode | string;
	children: ReactNode;
};

const SplitForm = ({ title, description, children }: SplitFormProps) => {
	return (
		<div className="md:grid md:grid-cols-3 md:gap-10">
			<div className="md:col-span-1">
				<h2 className="text-lg font-medium leading-6 text-gray-900">{title}</h2>

				{description ?? <p className="mt-1 text-sm text-gray-600">{description}</p>}
			</div>

			<div className="mt-5 md:col-span-2 md:mt-0">{children}</div>
		</div>
	);
};

export default SplitForm;
