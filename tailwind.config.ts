import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                'primary-hover': 'var(--primary-hover)',
                'background-light': 'var(--background-light)',
                'background-dark': 'var(--background-dark)',
                charcoal: 'var(--charcoal)',
                'charcoal-muted': 'var(--charcoal-muted)',
                'card-light': 'var(--card-light)',
                'card-dark': 'var(--card-dark)',
            },
            boxShadow: {
                soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                hover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'], // Assuming Inter is set as a variable in layout, usually it's passed as className but standard nextjs font sets css variable if configured. 
                // In the user's layout.tsx: `const inter = Inter({ subsets: ['latin'] });` and used as `${inter.className}`.
                // Tailwind automatically works with className, but if we wanted to use `font-sans`, default tailwind stack is fine or we can extend.
                // Since user didn't specify custom font config beyond loading Inter, we might not need this unless we want `font-sans` to be Inter explicitly. 
                // However, `inter.className` applies the font-family to body. So valid.
                display: ['var(--font-noto-serif)', 'serif'],
                body: ['var(--font-noto-sans)', 'sans-serif'],
            },
            keyframes: {
                breathe: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.8', filter: 'drop-shadow(0 0 5px rgba(253, 194, 18, 0.3))' },
                    '50%': { transform: 'scale(1.08)', opacity: '1', filter: 'drop-shadow(0 0 20px rgba(253, 194, 18, 0.6))' },
                },
                progress: {
                    '0%': { width: '0%' },
                    '30%': { width: '45%' },
                    '70%': { width: '75%' },
                    '100%': { width: '100%' },
                },
            },
            animation: {
                breathe: 'breathe 4s ease-in-out infinite',
                'progress-fill': 'progress 5s ease-out forwards',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
export default config;
