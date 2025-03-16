# MUI Theme Creator
This project allows users to create custom MUI themes. Users can download the `mui-themes.json` file and load it into their React/Next.js application to apply the theme.

## Demo - https://tu2l.github.io/mui-theme-creator/

## Local Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/tu2l/zoltraak-theme-creator.git
    ```
2.  Navigate to the project directory:

    ```bash
    cd zoltraak-theme-creator
    ```
3.  Install the dependencies:

    ```bash
    npm install # or yarn install
    ```
4.  Start the development server:

    ```bash
    npm start # or yarn start
    ```

## Usage

1.  Create your custom theme using the theme creator.
2.  Download the `mui-themes.json` file.
3.  In your React/Next.js application, import the theme:

    ```javascript
    import theme from './mui-themes.json';
    import { ThemeProvider, createTheme } from '@mui/material/styles';

    const muiTheme = createTheme(theme);

    function App({ Component, pageProps }) {
      return (
        <ThemeProvider theme={muiTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      );
    }

    export default App;
    ```
