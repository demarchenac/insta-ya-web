import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { appRoutes } from './pages';

import 'react-toastify/dist/ReactToastify.css';

export const router = createBrowserRouter(appRoutes);

function App() {
	return (
		<div>
			<ToastContainer />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
