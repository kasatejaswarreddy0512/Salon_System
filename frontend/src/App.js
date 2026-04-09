import { ThemeProvider } from '@mui/material';
import './App.css';
import greenTheme from './theme/greenTheme';
import SalonDeatils from './Customer/Salon/SalonDetails/SalonDetails';
// import Home from './Customer/Home/Home';



function App() {
  return (
    <ThemeProvider theme={greenTheme}>
      {/* <Home /> */}
      <SalonDeatils />
    </ThemeProvider>

  );
}

export default App;
