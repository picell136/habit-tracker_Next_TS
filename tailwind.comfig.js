module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'grid-cols-7',
    'grid-cols-28', 'grid-cols-29', 'grid-cols-30', 'grid-cols-31',
    'col-span-1', 'col-span-2', 'col-span-3', 'col-span-4', 'col-span-5', 'col-span-6', 'col-span-7',
    'row-span-1', 'row-span-2',
    'w-1/7', 'h-1/7',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};