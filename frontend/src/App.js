import { ThemeProvider } from '@mui/material';
import './App.css';
import greenTheme from './theme/greenTheme';
import CustomerRoutes from './Routes/CustomerRoutes';
import { Route, Routes } from 'react-router-dom';
import SalonDashBoard from './Salon/SalonDashBoard';


function App() {
  return (
    <ThemeProvider theme={greenTheme}>

      <Routes>
        <Route path="/salon-dashboard/*" element={<SalonDashBoard />} />
        <Route path="*" element={<CustomerRoutes />} />
      </Routes>
    </ThemeProvider>

  );
}

export default App;
