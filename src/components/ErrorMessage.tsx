const ErrorMessage = ({ message }: { message: string }) => {
	return (
		<p className='text-white text-xl text-center h-min flex-1 bg-accent rounded-lg p-4'>
			{message}
		</p>
	);
};
export default ErrorMessage;
