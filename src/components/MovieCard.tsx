import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import StarRating from './StarRating';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { Movie } from '../../types.ts';

interface Props {
	id: string;
	poster: string;
	title: string;
	year: string;
	watchedMovies: Movie[];
	setWatchedMovies: Dispatch<SetStateAction<Movie[]>>;
}

const MovieCard = ({
	id,
	poster,
	title,
	year,
	watchedMovies,
	setWatchedMovies,
}: Props) => {
	const [selectedMovieId, setSelectedMovieId] = useState('');
	const [isLoadingMovie, setIsLoadingMovie] = useState(false);
	const [errorMovie, setErrorMovie] = useState('');
	const [movie, setMovie] = useState<Movie | null>(null);
	const [userRating, setUserRating] = useState(0);

	console.log(movie);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoadingMovie(true);
				setErrorMovie('');
				const res = await fetch(
					`https://www.omdbapi.com/?apikey=${process.env.MOVIES_API_KEY}&i=${selectedMovieId}`
				);

				if (!res.ok) throw new Error('😢 Something went wrong fetching movie');

				const data = await res.json();

				if (data.Response === 'False') throw new Error('😯 Movie not found');

				setMovie(data);
			} catch (error) {
				setErrorMovie((error as Error)?.message);
				console.log((error as Error)?.message);
			} finally {
				setIsLoadingMovie(false);
			}
		};

		// Don't fetch if the id is empty
		if (selectedMovieId.length < 3) {
			setMovie(null);
			return;
		}

		fetchData();
	}, [selectedMovieId]);

	useEffect(() => {
		const movie = watchedMovies.find(m => m.imdbID === selectedMovieId);

		const ratingToSet = movie?.userRating ?? 0;

		setUserRating(ratingToSet);
	}, [selectedMovieId, watchedMovies]);

	// Change Page Title
	useEffect(() => {
		if (!movie?.Title) return;
		document.title = `Vault Movies | ${movie?.Title}`;

		return () => {
			document.title = 'Vault Movies';
		};
	}, [movie?.Title]);

	const handleWatchedMovie = () => {
		// add the new movies to the watchedMoviesList
		setWatchedMovies((watched: Movie[]) => {
			return watched ? [...watched, { ...movie!, userRating }] : [];
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card
					className='cursor-pointer h-[350px] max-w-full'
					onClick={() => setSelectedMovieId(id)}>
					<CardHeader className='p-3'>
						<div className='rounded-md overflow-hidden h-[200px] w-full mb-2'>
							<img
								src={poster}
								alt='movie'
								className='object-cover w-full h-full object-center'
							/>
						</div>
						<CardTitle>{title}</CardTitle>
					</CardHeader>
					<CardContent className='p-3'>{year}</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[500px]'>
				{isLoadingMovie && !errorMovie && (
					<div className='flex-1 flex items-center justify-center'>
						<Loader />
					</div>
				)}
				{!isLoadingMovie && !errorMovie && (
					<>
						<DialogHeader className='flex flex-col sm:flex-row justify-center items-center sm:items-start gap-4'>
							<div className='rounded-md overflow-hidden h-[200px] sm:h-[320px] w-[130px] sm:w-[340px] mb-2'>
								<img
									src={movie?.Poster}
									alt='movie'
									className='object-cover w-full h-full object-center'
								/>
							</div>
							<div>
								<DialogTitle className='text-2xl text-white'>
									{movie?.Title}
								</DialogTitle>
								<div className='mt-4'>
									<ul className='text-white flex flex-col space-y-2'>
										<li>
											{movie?.Released} • {movie?.Runtime}
										</li>
										<li>{movie?.Actors}</li>
										<li>{movie?.Genre}</li>
										<li>⭐️ {movie?.imdbRating}</li>
									</ul>
								</div>
							</div>
						</DialogHeader>
						<div className='grid gap-4 py-4 text-white italic'>
							{movie?.Plot}
						</div>
						<DialogFooter className='flex flex-col space-y-2 items-center'>
							<StarRating
								maxRating={5}
								color='#ffc436'
								size='48'
								userRating={userRating}
								setUserRating={setUserRating}
							/>
							{userRating !== 0 && (
								<Button
									className='w-full'
									onClick={() => handleWatchedMovie()}
									disabled={
										movie !== undefined &&
										watchedMovies.some(m => m.imdbID === movie?.imdbID)
									}>
									{watchedMovies.find(m => m.imdbID === movie?.imdbID)
										? 'Already Watched'
										: '+ Add to list'}
								</Button>
							)}
						</DialogFooter>
					</>
				)}

				{errorMovie && <ErrorMessage message={errorMovie} />}
			</DialogContent>
		</Dialog>
	);
};
export default MovieCard;
