import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import MoviesList from './components/MoviesList';
import Tracker from './components/Tracker';
import { Movie } from '../types.ts';

function App() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [watchedMovies, setWatchedMovies] = useState<Movie[]>(() => {
		const storedWatchedMovies = localStorage.getItem('watched') || '[]';
		return JSON.parse(storedWatchedMovies);
	});
	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		localStorage.setItem('watched', JSON.stringify(watchedMovies));
	}, [watchedMovies]);

	useEffect(() => {
		// AbortController
		const controller = new AbortController();

		const fetchData = async () => {
			try {
				setIsLoading(true);
				setError('');
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${process.env.MOVIES_API_KEY}&s=${query}`,
					{ signal: controller.signal }
				);

				if (!res.ok) throw new Error('😢 Something went wrong fetching movies');

				const data = await res.json();

				if (data.Response === 'False') throw new Error('😯 Movie not found');

				setMovies(data.Search);
			} catch (error) {
				console.log((error as Error)?.message);
				if ((error as Error)?.name !== 'AbortError') {
					setError((error as Error)?.message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		// Don't fetch if the query don't provide info
		if (query.length < 3) {
			setMovies([]);
			return;
		}

		fetchData();

		return () => controller.abort();
	}, [query]);

	return (
		<div className='flex flex-col min-h-screen p-3'>
			<div className='flex-1 '>
				<Header setQuery={setQuery} />
				<main className='mt-4 flex flex-col sm:flex-row gap-4 mb-4'>
					<Tracker
						watchedMovies={watchedMovies}
						setWatchedMovies={setWatchedMovies}
					/>
					<MoviesList
						isLoading={isLoading}
						error={error}
						movies={movies}
						watchedMovies={watchedMovies}
						setWatchedMovies={setWatchedMovies}
					/>
				</main>
			</div>
			<Footer results={movies.length} />
		</div>
	);
}

export default App;
