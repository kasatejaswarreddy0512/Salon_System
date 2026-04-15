import { ThemeProvider } from '@mui/material';
import './App.css';
import greenTheme from './theme/greenTheme';
import CustomerRoutes from './Routes/CustomerRoutes';
import { Route, Routes } from 'react-router-dom';
import SalonDashBoard from './Salon/SalonDashBoard';
import Auth from './Auth/Auth';


function App() {
  return (
    <ThemeProvider theme={greenTheme}>

      <Routes>
        <Route path="/salon-dashboard/*" element={<SalonDashBoard />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<CustomerRoutes />} />
      </Routes>
    </ThemeProvider>

  );
}

export default App;
