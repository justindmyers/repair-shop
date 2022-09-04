import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { ReactNode } from 'react';
import Header from '../header/header';

export type LayoutProps = {
	pageTitle: string;
	subTitle?: string;
	children?: ReactNode;
	showSearch?: boolean;
};

const Layout = ({ children, pageTitle, subTitle, showSearch = false }: LayoutProps) => {
	return (
		<>
			<Header />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">{pageTitle}</h1>
						{subTitle ? <p className="mt-1">{subTitle}</p> : null}
					</div>

					{showSearch ? (
						<div className="w-full max-w-lg lg:max-w-xs">
							<label htmlFor="search" className="sr-only">
								Search
							</label>

							<div className="relative border-gray-300">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
								</div>

								<input
									id="search"
									name="search"
									className="py-2 pl-10 pr-3 leading-5 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									placeholder="Search"
									type="search"
								/>
							</div>
						</div>
					) : null}
				</div>

				{children}
			</div>
		</>
	);
};

export default Layout;
