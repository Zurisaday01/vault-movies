export interface Movie {
	Poster: string | undefined;
	Title: string;
	Type: string;
	Year: string;
	imdbID: string;
	Actors?: string;
	Awards?: string;
	BoxOffice?: string;
	Country?: string;
	DVD?: string;
	Director?: string;
	Genre?: string;
	Language?: string;
	Metascore?: string;
	Plot?: string;
	Production?: string;
	Rated?: string;
	Ratings?: { Source: string; Value: string }[];
	Released?: string;
	Response?: string;
	Runtime?: string;
	Website?: string;
	Writer?: string;
	imdbRating?: string | number | undefined;
	imdbVotes?: string;
	userRating?: number;
}
