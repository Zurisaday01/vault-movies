import { Dispatch, SetStateAction } from 'react';
import Search from './Search';
import logo from '/logo.png';

interface Props {
	setQuery: Dispatch<SetStateAction<string>>
}

const Header = ({setQuery}: Props) => {
	return (
		<header className='flex justify-between items-center bg-primary py-2 px-4 md:px-8 rounded-md'>
			<div className='flex gap-1 items-center'>
				<img src={logo} alt='Logo' />
				<span className='text-2xl font-bold text-stale-300'>Vault</span>
			</div>
			<div className='w-[200px] md:w-[300px]'>
				<Search setQuery={setQuery}/>
			</div>
		</header>
	);
};
export default Header;
