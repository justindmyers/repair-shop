import { Combobox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { forwardRef, Fragment, useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

export type ComboBoxOption = { id: number; name: string };

export type ComboBoxProps = {
	id: string;
	label: string;
	error?: FieldError;
	options: ComboBoxOption[];
} & { onChange: (e: string | undefined) => void};

const ComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(({ id, label, error, onChange, options = [], ...comboboxProps }: ComboBoxProps, ref) => {
	const [selected, setSelected] = useState<ComboBoxOption | undefined>();
	const [query, setQuery] = useState('');

	const filteredResults =
		query === ''
			? options
			: options.filter((option) =>
					option.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	useEffect(() => {
		onChange(selected?.name);
	}, [selected])

	return (
		<>
			<label
				htmlFor={'device-manufacturer'}
				className={classNames('block text-sm font-medium text-gray-700', {
					'text-red-600': error?.message,
				})}>
				{label}
			</label>
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<div className={
						classNames(
							"relative w-full cursor-default overflow-hidden bg-white text-left mt-1 block rounded-md border shadow-sm sm:text-sm",
							error
							? 'border-red-600 focus:border-red-600 focus:ring-red-600'
							: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
						)
					}>
						<Combobox.Input
							autoComplete="off"
							id={id}
							{...comboboxProps}
							ref={ref}
							className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
							displayValue={(option: ComboBoxOption) => option?.name}
							onChange={(event) => setQuery(event.target.value)}
						/>

						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</Combobox.Button>
					</div>

					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredResults.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
							) : (
								filteredResults.map((result) => (
									<Combobox.Option
										key={result.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-indigo-600 text-white' : 'text-gray-900'
											}`
										}
										value={result}>
										{({ selected, active }) => (
											<>
												<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
													{result.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? 'text-white' : 'text-teal-600'
														}`}>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>

			{error?.message ? (
				<p className="text-xs text-red-600 mt-0.5" aria-live="assertive">
					{error.message}
				</p>
			) : null}
		</>
	);
});

export default ComboBox;
