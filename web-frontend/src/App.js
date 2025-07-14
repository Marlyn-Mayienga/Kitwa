import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Routes from './Routes' 
import SignIn from './components/Auth/SignIn'
import PrivateRoute from './components/Auth/PrivateRoute'
import CulturalEventsDashboard from "./components/Dashboard/CulturalEventsDashboard";



function App() {
  return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/signin" element={<SignIn />} />
					<Route element={<PrivateRoute />}>
						<Route path="*" exact element={<CulturalEventsDashboard />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App
