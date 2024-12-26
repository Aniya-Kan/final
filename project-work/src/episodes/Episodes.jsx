import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Episodes.module.css'

export default function Episodes() {
	const [episodes, setEpisodes] = useState([])
	const [page, setPage] = useState(1)
	const [maxPage, setMaxPage] = useState(1)
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchEpisodes = async () => {
		setLoading(true)
		try {
			const response = await axios.get(
				'https://rickandmortyapi.com/api/episode/?page=${page}'
			)
			setEpisodes(response.data.results)
			setMaxPage(response.data.info.pages)
		} catch (err) {
			setError('Failed to fetch episodes.')
			console.error(err)
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchEpisodes()
	}, [page])

	const filteredEpisodes = episodes.filter(episode =>
		episode.name.toLowerCase().includes(search.toLowerCase())
	)

	if (loading) return <div className={styles.loading}>Loading...</div>
	if (error) return <div className={styles.error}>{error}</div>

	return (
		<div className={styles.episodesWrapper}>
			<div className={styles.search}>
				<input
					type='text'
					placeholder='Введите название эпизода'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>
			<div className={styles.container}>
				{filteredEpisodes.length > 0 ? (
					filteredEpisodes.map(episode => (
						<div className={styles.card} key={episode.id}>
							<h3>{episode.name}</h3>
							<div className={styles.episodeInfo}>
								<p>Episode: {episode.episode}</p>
								<p>Air Date: {episode.air_date}</p>
							</div>
						</div>
					))
				) : (
					<p className={styles.notFound}>Эпизоды не найдены</p>
				)}
			</div>
			<div className={styles.pagination}>
				<p className={styles.pageInfo}>
					Страница {page} из {maxPage}
				</p>
				<div className={styles.buttons}>
					<button onClick={() => setPage(page - 1)} disabled={page <= 1}>
						Назад
					</button>
					<button onClick={() => setPage(page + 1)} disabled={page >= maxPage}>
						Вперед
					</button>
				</div>
			</div>
		</div>
	)
}
