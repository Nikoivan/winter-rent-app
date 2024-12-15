import {createBrowserRouter} from 'react-router-dom';

import PricesPage from './pages/Prices.tsx';
import RentPage from './pages/Rent.tsx';
import CalendarPage from './pages/Calendar.tsx';
import App from './App';
import IndexPage from './pages/Index';
import RentItemPage from './pages/RentItemPage.tsx';
import Audit from './components/Audit/Audit.tsx';


const router = createBrowserRouter([
		{
				path: '/',
				Component: App,
				children: [
						{index: true, Component: IndexPage},
						{
								path: 'prices',
								Component: PricesPage,
						},
						{
								path: 'rent',
								Component: RentPage,
								children: [
										{index: true, Component: Audit},
										{path: ':id', Component: RentItemPage},
								],
						},
						{
								path: 'calendar',
								Component: CalendarPage,
						},
				],
		},

]);

export default router;