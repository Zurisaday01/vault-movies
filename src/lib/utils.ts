import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const extractRuntimeNumber = (
	runtimeString?: string
): number | undefined => {
	if (runtimeString) {
		const match = runtimeString.match(/\d+/);
		if (match) {
			return parseInt(match[0], 10);
		}
	}
	return undefined;
};
