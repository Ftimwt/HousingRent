import type {Config} from 'tailwindcss'
const { resolveConfig } = require('tailwindcss');
require('dotenv').config({ path: '.env.local' });

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors:{
                primary:`${process.env.VITE_COLOR_PRIMARY}`,
                secondary: `${process.env.VITE_COLOR_SECONDARY}`
            }
        },
    },
    plugins: [],
}
export default config