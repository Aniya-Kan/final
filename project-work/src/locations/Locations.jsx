import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '@/loader'
import { useNavigate } from 'react-router-dom'

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

	const fetchCharacterNames = async urls => {
		try {
			const responses = await Promise.all(urls.map(url => axios.get(url)))
			return responses.map(response => response.data.name) // Возвращаем только имена
		} catch (error) {
			console.error('Failed to fetch character names:', error)
			return []
		}
	}

	const fetchLocations = async currentPage => {
		if (isLoading || page > totalPages) return
		setIsLoading(true)

		try {
			const response = await axios.get(
				`https://rickandmortyapi.com/api/location/?page=${currentPage}`
			)
			const newLocations = response.data.results.map(location => ({
				...location,
				residentCount: location.residents.length, // Считаем количество резидентов
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
		const threshold = document.documentElement.offsetHeight - 100 // Adjust threshold as needed

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
			<div className='my-4 text-center'>
				<input
					type='text'
					placeholder='Search characters...'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='border-[1px] rounded px-2 py-1 w-[300px]'
				/>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{filteredLocations.length > 0 ? (
					filteredLocations.map(location => (
						<div
							key={location.id} // Уникальный ключ
							className='w-[200px] h-[200px] bg-slate-300 flex items-center justify-center'
						>
							<div className='p-4'>
								<h2 className='text-lg font-semibold text-gray-800'>
									{location.id}. {location.name}
								</h2>
								<p className='text-sm text-gray-600 mt-2'>
									<span className='font-bold'>Type:</span> {location.type}
								</p>
								<p className='text-sm text-gray-600'>
									<span className='font-bold'>Dimension:</span>{' '}
									{location.dimension}
								</p>
								<p className='text-sm text-gray-600'>
									<span className='font-bold'>Residents:</span>{' '}
									<button
										onClick={() => navigate(`/residents/${location.id}`)}
										className='text-blue-500 underline'
									>
										{location.residentCount}
									</button>
								</p>
							</div>
						</div>
					))
				) : (
					<p className='text-center w-full'>No locations found</p>
				)}
			</div>

			{isLoading && (
				<div className='text-center mt-4'>
					<Loader />
				</div>
			)}
		</React.Fragment>
	)
}
