import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Input } from './ui/input';

interface Props {
	setQuery: Dispatch<SetStateAction<string>>;
}

const Search = ({ setQuery }: Props) => {
	const inputEl = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		inputEl.current?.focus();
	}, []);

	return (
		<>
			<Input
				placeholder='Search movie...'
				onChange={e => setQuery(e.target.value)}
				ref={inputEl}
			/>
		</>
	);
};
export default Search;
