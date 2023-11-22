import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Star from './Star';

interface Props {
	maxRating: number;
	color?: string;
	size?: string;
	userRating: number;
	setUserRating: Dispatch<SetStateAction<number>>;
}

const StarRating = ({
	maxRating,
	color = '#ffc436',
	size = '48',
	userRating,
	setUserRating,
}: Props) => {
	const [rating, setRating] = useState(userRating);
	const [tempRating, setTempRating] = useState(0);

	useEffect(() => {
		if (rating) {
			setUserRating(rating);
		}
	}, [rating, setUserRating]);

	return (
		<div className='flex bg-secondary w-full justify-center p-2 pt-4 rounded-md'>
			{Array.from({ length: maxRating }, (_, i) => (
				<Star
					key={i}
					onClick={() => setRating(i + 1)}
					full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
					onMouseEnter={() => setTempRating(i + 1)}
					onMouseLeave={() => setTempRating(0)}
					color={color}
					size={size}
				/>
			))}

			<p className={`mt-1 text-[${color}]`}>{rating || tempRating || ''}</p>
		</div>
	);
};
export default StarRating;
