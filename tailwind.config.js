/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    container: {
      padding: '1rem',
      center: true,
    },
    extend: {
     colors:{
      'primary':'#411530',
      'secondary' :'#D1512D',
      'secondary-300':'#F5C7A9',
      'secondary-100':'#F5E8E4'
     },
    },
  },
  plugins: [],
}
