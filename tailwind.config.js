// https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontSize: {
      '128/16': '8rem', // 9xl
      '96/16': '6rem', // 8xl
      '72/16': '4.5rem', // 7xl
      '60/16': '3.75rem', // 6xl
      '48/16': '3rem', // 5xl
      '36/16': '2.25rem', // 4xl

      '32/16': '2rem',
      '31/16': '1.938rem',
      '30/16': '1.875rem', // 3xl
      '29/16': '1.813rem',
      '28/16': '1.75rem',
      '27/16': '1.688rem',
      '26/16': '1.625rem',
      '25/16': '1.563rem',
      '24/16': '1.5rem', // 2xl
      '23/16': '1.438rem',
      '22/16': '1.375rem',
      '21/16': '1.313rem',
      '20/16': '1.25rem', // xl
      '19/16': '1.188rem',
      '18/16': '1.125rem', // lg
      '17/16': '1.063rem',

      '16/16': '1rem', // base
      '15/16': '.938rem',
      '14/16': '.875rem', // sm
      '13/16': '.813rem',
      '12/16': '.75rem', // xs
      '11/16': '.688rem',
      '10/16': '.625rem',
      '9/16': '.563rem',
      '8/16': '.5rem',
      '7/16': '.438rem',
      '6/16': '.375rem',
      '5/16': '.313rem',
      '4/16': '.25rem',
      '3/16': '.188rem',
      '2/16': '.125rem',
      '1/16': '.063rem',
    },

    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1560px', // default: 1536px
    },

    extend: {
      fontFamily: {
        'proxima-nova': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        // https://javisperez.github.io/tailwindcolorshades/?primary=F9B949
        primary: {
          50: '#fffcf6', 
          100: '#fef8ed', 
          200: '#feeed2', 
          300: '#fde3b6', 
          400: '#fbce80', 
          500: '#f9b949', 
          600: '#e0a742', 
          700: '#bb8b37', 
          800: '#956f2c', 
          900: '#7a5b24',
          DEFAULT: '#f9b949',
        },
      },

      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        '60px': '60px',
        '65px': '65px'
      },

      borderWidth: {
        5: '5px',
      },

      zIndex: {
        1: '1',
      },

      minHeight: (theme) => ({
        ...theme('spacing'),
      }),

      minWidth: (theme) => ({
        ...theme('spacing'),
      }),

      maxHeight: (theme) => ({
        ...theme('spacing'),
      }),

      maxWidth: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },

  variants: {
    extend: {
      textColor: ['active'],
      backgroundColor: ['active, disabled'],
      backgroundOpacity: ['active'],
      ringWidth: ['active'],
      visibility: ['group-hover'],
      display: ['group-hover'],
      opacity: ['group-hover'],
      zIndex: ['hover'],
    },
  },

  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}'
    ],

    options: {
      keyframes: true,
      variables: true,
      rejected: true,
    },
  },
};
