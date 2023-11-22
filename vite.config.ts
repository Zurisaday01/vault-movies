import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		define: {
			'process.env.MOVIES_API_KEY': JSON.stringify(env.MOVIES_API_KEY),
		},
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	};
});
