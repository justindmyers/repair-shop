import Head from "next/head";
import Divider from "../../components/divider/divider";
import Layout from "../../components/layout/layout";

const ConfirmationPage = () => {
	return (
		<Layout pageTitle="Request Confirmed" subTitle="Thank you for your service repair request!">
			<Head>
				<title>Repair Request Confirmation -- Local College Shop</title>
				<meta name="description" content="Rapid repair device service for local college" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Divider />

			<p>Our technicians will be in touch with you with the status of your repair request.</p>
		</Layout>
	);
};

export default ConfirmationPage;
