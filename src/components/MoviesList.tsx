import MovieCard from './MovieCard';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import { Dispatch, SetStateAction } from 'react';
import { Movie } from '../../types.ts';

interface Props {
	isLoading: boolean;
	error: string;
	movies: Movie[];
	watchedMovies: Movie[];
	setWatchedMovies: Dispatch<SetStateAction<Movie[]>>;
}

const MoviesList = ({
	isLoading,
	error,
	movies,
	watchedMovies,
	setWatchedMovies,
}: Props) => {
	return (
		<section
			className={` flex-1 ${
				isLoading || error
					? 'flex'
					: 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-start justify-start'
			}`}>
			{isLoading && !error && (
				<div className='flex-1 flex items-center justify-center'>
					<Loader />
				</div>
			)}
			{!isLoading &&
				!error &&
				movies.map((movie: Movie) => (
					<MovieCard
						key={movie.imdbID}
						id={movie.imdbID}
						poster={
							movie.Poster ||
							'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
						}
						title={movie.Title}
						year={movie.Year}
						watchedMovies={watchedMovies}
						setWatchedMovies={setWatchedMovies}
					/>
				))}

			{error && <ErrorMessage message={error} />}
		</section>
	);
};
export default MoviesList;
