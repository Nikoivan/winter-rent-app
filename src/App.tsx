import {FC, PropsWithChildren} from "react";
import {cn} from "@bem-react/classname";
import {Provider} from "react-redux";
import {Outlet} from "react-router-dom";


import store from "./lib/redux/store.ts";
import Header from "./components/Header/Header.tsx";

import './App.css';


const cnLayout = cn('Layout');

const App: FC<PropsWithChildren> = () => (
		<Provider store={store}>
				<div className={cnLayout()}>
						<Header/>
						<Outlet/>
				</div>
		</Provider>
);

export default App;