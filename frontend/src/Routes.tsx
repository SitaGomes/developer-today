import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './views/App';
import { ROUTES } from './contants';
import { Country } from './views/Country';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING} element={<App />} />

        <Route path={ROUTES.COUNTRY} element={<Country />} />
      </Routes>
    </BrowserRouter>
  );
}
