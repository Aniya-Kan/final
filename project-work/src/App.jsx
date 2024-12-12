import React from 'react'
import Layout from './components/layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Characters from './characters/Characters'
import Locations from './locations/Locations'
import Episodes from './episodes/Episodes'
import Residents from './components/residents/Residents'

export default function App() {
	return (
		<React.Fragment>
			<Layout>
				<Routes>
					<Route path='/Characters' element={<Characters />} />
					<Route path='/Locations' element={<Locations />} />
					<Route path='/' element={<Episodes />} />
					<Route path='/residents/:locationId' element={<Residents />} />
				</Routes>
			</Layout>
		</React.Fragment>
	)
}
