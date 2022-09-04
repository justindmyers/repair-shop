import classNames from 'classnames';
import { forwardRef, HTMLProps, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export type InputProps = {
	label: ReactNode | string;
	error?: FieldError;
} & Omit<HTMLProps<HTMLInputElement>, 'name'>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, id, type = 'text', error, ...inputProps }: InputProps, ref) => {
	return (
		<>
			<label htmlFor={id} className={classNames(
				"block text-sm font-medium text-gray-700",
				{ 'text-red-600': error }
			)}>
				{label}
			</label>

			<input
				{...inputProps}
				ref={ref}
				type={type}
				id={id}
				className={
					classNames(
						"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
						{ 'border-red-600 focus:border-red-600 focus:ring-red-600': error }
					)
				}
			/>

			{error?.message ? (
				<p className="text-xs text-red-600 mt-0.5" aria-live="assertive">
					{error.message}
				</p>
			) : null}
		</>
	);
});

export default Input;
