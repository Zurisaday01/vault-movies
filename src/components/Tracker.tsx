import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { IoIosCloseCircle } from 'react-icons/io';
import { Movie } from '../../types.ts';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Dispatch, SetStateAction } from 'react';
import { extractRuntimeNumber } from '@/lib/utils.ts';

interface Props {
	watchedMovies: Movie[];
	setWatchedMovies: Dispatch<SetStateAction<Movie[]>>;
}

const Tracker = ({ watchedMovies, setWatchedMovies }: Props) => {
	const moviesCount = watchedMovies.length;
	const averageImdbRating =
		watchedMovies.reduce(
			(sum, movie) => sum + ((+movie.imdbRating! as number) || 0),
			0
		) / watchedMovies.length || 0;

	const averageUserRating =
		watchedMovies.reduce(
			(sum, movie) => sum + ((+movie.userRating! as number) || 0),
			0
		) / watchedMovies.length || 0;

	const runtimes = watchedMovies
		.map(movie => extractRuntimeNumber(movie.Runtime))
		.filter(runtime => runtime !== undefined) as number[];
	const averageRuntime =
		runtimes.reduce((sum, runtime) => sum + runtime, 0) / runtimes.length || 0;

	const handleDeleteWatched = (id: string) => {
		setWatchedMovies((movies: Movie[]) =>
			movies.filter((m: Movie) => m.imdbID !== id)
		);
	};

	return (
		<div>
			<Card className='w-full sm:w-[250px]'>
				<CardHeader className='px-3'>
					<CardTitle className='text-xl'>Movies you have watched</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col gap-2 px-3'>
					<span>#️⃣ {moviesCount} movies</span>
					<span>⭐️ {averageImdbRating.toFixed(2)}</span>
					<span>🌟 {averageUserRating.toFixed(2)}</span>
					<span>⏳ {Math.floor(averageRuntime)} min</span>
				</CardContent>
				<CardFooter className='px-3 flex flex-col'>
					<Accordion type='single' collapsible className='w-full'>
						<AccordionItem value='item-3'>
							<AccordionTrigger>
								List (
								{watchedMovies.length === 1
									? `${watchedMovies.length} movie`
									: `${watchedMovies.length} movies`}{' '}
								)
							</AccordionTrigger>
							<AccordionContent className='flex flex-col gap-2'>
								{watchedMovies.map((movie: Movie) => (
									<div
										className='flex gap-2 items-center justify-between w-full'
										key={movie.imdbID}>
										<div className='flex gap-2 items-center flex-1'>
											<div className='rounded-md overflow-hidden h-[50px] w-[50px] mb-2'>
												<img
													src={movie.Poster}
													alt='movie'
													className='object-cover w-full h-full object-center'
												/>
											</div>
											<div>
												<h3 className='text-xl text-white'>{movie.Title}</h3>
												<p className='text-[10px] flex gap-2'>
													<span>
														⭐️{' '}
														{((+movie.imdbRating! as number) || 0).toFixed(2)}
													</span>
													<span>🌟 {movie?.userRating?.toFixed(2)}</span>
													<span>⏳ {movie.Runtime}</span>
												</p>
											</div>
										</div>

										<div
											className='text-primary cursor-pointer'
											onClick={() => handleDeleteWatched(movie.imdbID)}>
											<IoIosCloseCircle className='text-xl' />
										</div>
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</CardFooter>
			</Card>
		</div>
	);
};
export default Tracker;

// NOTE: So, ! indicates that the property won't be undefined or null. It's a way of telling the compiler, "I know what I'm doing, and I'm confident that this value is not null or undefined."
