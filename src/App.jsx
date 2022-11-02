import { ToastContainer } from 'react-toastify';
import { AppRouter } from './pages';

import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div>
			<ToastContainer />
			<AppRouter />
		</div>
	);
}

export default App;
