import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '@/loader'
import { useNavigate } from 'react-router-dom'
import './Location.css'

export default function Locations() {
	const [locations, setLocations] = useState([])
	const [filteredLocations, setFilteredLocations] = useState([])
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		fetchLocations(page)
	}, [page])

	const fetchLocations = async currentPage => {
		if (isLoading || page > totalPages) return
		setIsLoading(true)

		try {
			const response = await axios.get(
				`https://rickandmortyapi.com/api/location/?page=${currentPage}`
			)
			const newLocations = response.data.results.map(location => ({
				...location,
				residentCount: location.residents.length,
			}))

			setLocations(prev => [...prev, ...newLocations])
			setFilteredLocations(prev => [...prev, ...newLocations])
			setTotalPages(response.data.info.pages)
		} catch (e) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	const handleScroll = () => {
		const scrollPosition = window.innerHeight + window.scrollY
		const threshold = document.documentElement.offsetHeight - 100

		if (scrollPosition >= threshold && !isLoading) {
			setPage(prev => prev + 1)
		}
	}

	useEffect(() => {
		const filtered = locations.filter(location =>
			location.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
		setFilteredLocations(filtered)
	}, [searchQuery, locations])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [isLoading])

	return (
		<React.Fragment>
			<div className='locations-Bg'>
				<div className='search-bar'>
					<input
						type='text'
						placeholder='Search locations...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='search-style'
					/>
				</div>
				<div className='location-Container'>
					{filteredLocations.length > 0 ? (
						filteredLocations.map(location => (
							<div
								key={location.id} // Уникальный ключ
								className='location-card'
							>
								<div className='location-info'>
									<h2 className='location-name'>
										{location.id}. {location.name}
									</h2>
									<p className='location-key'>
										<span className='font-bold'>Type:</span> {location.type}
									</p>
									<p className='location-key'>
										<span className='font-bold'>Dimension:</span>{' '}
										{location.dimension}
									</p>
									<p className='location-key'>
										<span className='font-bold'>Count of Residents:</span>{' '}
										<button
											onClick={() => navigate(`/residents/${location.id}`)}
											className='to-residents'
										>
											{location.residentCount}
										</button>
									</p>
								</div>
							</div>
						))
					) : (
						<p className='locations-no'>No locations found</p>
					)}
				</div>
			</div>

			{isLoading && (
				<div className='loader'>
					<Loader />
				</div>
			)}
		</React.Fragment>
	)
}
