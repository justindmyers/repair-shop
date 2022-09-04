export type CreateRequestForm = {
	personal: {
		firstName: string;
		lastName: string;
		emailAddress: string;
		streetAddress: string;
		city: string;
		state: string;
		zipcode: string;
		mobilePhone: string;
	};
	device: {
		deviceType: string;
		manufacturer: string;
		serialNumber: string;
		modelNumber: string;
	};
	communication: {
		phone: boolean;
	};
};