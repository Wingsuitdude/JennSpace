module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3498db',
        'secondary': '#2ecc71',
        'accent': '#e74c3c',
        'background': '#ecf0f1',
        'text': '#34495e',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'color-change': 'colorChange 8s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'color-change-1': 'colorChange1 10s ease-in-out infinite',
        'color-change-2': 'colorChange2 12s ease-in-out infinite',
        'color-change-3': 'colorChange3 14s ease-in-out infinite',
        'color-change-4': 'colorChange4 16s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        colorChange: {
          '0%, 100%': { color: '#3498db' },
          '25%': { color: '#2ecc71' },
          '50%': { color: '#e74c3c' },
          '75%': { color: '#f39c12' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        colorChange1: {
          '0%, 100%': { backgroundColor: 'rgba(52, 152, 219, 0.3)' },
          '50%': { backgroundColor: 'rgba(155, 89, 182, 0.3)' }
        },
        colorChange2: {
          '0%, 100%': { backgroundColor: 'rgba(46, 204, 113, 0.3)' },
          '50%': { backgroundColor: 'rgba(241, 196, 15, 0.3)' }
        },
        colorChange3: {
          '0%, 100%': { backgroundColor: 'rgba(231, 76, 60, 0.3)' },
          '50%': { backgroundColor: 'rgba(52, 152, 219, 0.3)' }
        },
        colorChange4: {
          '0%, 100%': { backgroundColor: 'rgba(243, 156, 18, 0.3)' },
          '50%': { backgroundColor: 'rgba(46, 204, 113, 0.3)' }
        }
      },
    },
  },
  plugins: [],
}