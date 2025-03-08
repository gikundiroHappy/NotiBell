/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'serif'],
        'poppins-bold': ['Outfit-Bold'],
        'poppins-extrabold': ['Poppins-ExtraBold', 'serif'],
        'poppins-extralight': ['Poppins-ExtraLight', 'serif'],
        'poppins-light': ['Poppins-Light', 'serif'],
        'poppins-medium': ['Poppins-Medium', 'serif'],
        'poppins-regular': ['Poppins-Regular', 'serif'],
        'poppins-semibold': ['Poppins-SemiBold', 'serif'],
        'poppins-thin': ['Poppins-Thin', 'serif'],
      },
      colors: {
        primary: '#12A08A',
      },
    },
  },
  plugins: [],
};
