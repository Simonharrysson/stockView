import './style.css';
import { StockTable } from './components/StockTable';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
      primary: {
          main: '#ebf5f5',
          light: '#ffffff',
          dark: '#000000',
      },
      secondary: {
          main: '#598588',
      },
      
      error: {
          main: red.A400,
      },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <div className="tw-flex"> */}
          <StockTable />
          {/* <p>News</p> */}
        {/* </div> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
