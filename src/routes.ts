import { createBrowserRouter } from 'react-router-dom';

import PricesPage from './pages/PricesPage.tsx';
import RentPage from './pages/RentPage.tsx';
import CalendarPage from './pages/CalendarPage.tsx';
import App from './App';
import IndexPage from './pages/IndexPage.tsx';
import RentItemPage from './pages/RentItemPage.tsx';
import Audit from './components/Audit/Audit.tsx';

const router = createBrowserRouter([
  {
    path: '/winter-rent-crm',
    Component: App,
    children: [
      { index: true, Component: IndexPage },
      {
        path: 'prices',
        Component: PricesPage
      },
      {
        path: 'rent',
        Component: RentPage,
        children: [
          { index: true, Component: Audit },
          { path: ':id', Component: RentItemPage }
        ]
      },
      {
        path: 'calendar',
        Component: CalendarPage
      }
    ]
  }
]);

export default router;
