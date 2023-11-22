const Footer = ({ results }: { results: number }) => {
	return (
		<footer className='flex justify-between items-center bg-primary py-2 px-4 md:px-8 rounded-md text-stale-300'>
			Found {results} results
		</footer>
	);
};
export default Footer;
