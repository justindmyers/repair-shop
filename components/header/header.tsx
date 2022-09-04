import Link from 'next/link';

const navigation = [
	{ name: 'Repairs', href: '/admin/repairs' },
	{ name: 'Customers', href: '/admin/customers' },
];

const Header = () => {
	return (
		<header className="bg-indigo-600 sticky top-0">
			<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
					<div className="flex items-center justify-between">
						<a href="/" className="text-white">
							Local College Repair
						</a>
					</div>

					<div className="flex items-center sm:ml-10 space-x-4 sm:space-x-10">
						<div className="hidden space-x-8 lg:block">
							{navigation.map((link) => (
								<Link
									key={link.href}
									href={link.href}>
									<a className="text-base font-medium text-white hover:text-indigo-50">{link.name}</a>
								</Link>
							))}
						</div>

						<Link href="/create">
							<a className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50">
								Submit a Repair
							</a>
						</Link>
					</div>
				</div>

				<div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
					{navigation.map((link) => (
						<Link key={link.href} href={link.href}>
							<a className="text-base font-medium text-white hover:text-indigo-50">{link.name}</a>
						</Link>
					))}
				</div>
			</nav>
		</header>
	);
};

export default Header;
