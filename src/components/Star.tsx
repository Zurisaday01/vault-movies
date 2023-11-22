interface Props {
	full: boolean;
	color: string;
	size: string;
	onClick: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

const Star = ({ full, color, size, ...others }: Props) => {
	return (
		<span role='button' className='cursor-pointer' {...others}>
			{full ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill={color}
					stroke={color}
					strokeWidth='1'
					strokeLinejoin='round'
					strokeLinecap='round'
					width={size}
					height={size}>
					<path d='M12 2l1.44 4.32h4.56l-3.648 2.88 1.44 4.32-3.648-2.88-3.648 2.88 1.44-4.32-3.648-2.88h4.56z' />
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke={color}
					strokeWidth='1'
					strokeLinejoin='round'
					strokeLinecap='round'
					width={size}
					height={size}>
					<path d='M12 2l1.44 4.32h4.56l-3.648 2.88 1.44 4.32-3.648-2.88-3.648 2.88 1.44-4.32-3.648-2.88h4.56z' />
				</svg>
			)}
		</span>
	);
};
export default Star;
