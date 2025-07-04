/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins-Black'],
        'poppins-bold': ['Poppins-Bold', 'sans-serif'],
        'poppins-extrabold': ['Poppins-ExtraBold', 'sans-serif'],
        'poppins-extralight': ['Poppins-ExtraLight', 'sans-serif'],
        'poppins-light': ['Poppins-Light', 'sans-serif'],
        'poppins-medium': ['Poppins-Medium', 'sans-serif'],
        'poppins-regular': ['Poppins-Regular', 'sans-serif'],
        'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
        'poppins-thin': ['Poppins-Thin', 'sans-serif'],
      },
      colors: {
        primary: '#12A08A',
        secondary: '#F3F5F6',
        bgdark: '#10141E',
        bgnavy: '#161D2F',
        textdark: '#EAEAEA',
        borderdark: '#5A698F',
      },
    },
  },
  plugins: [],
};
