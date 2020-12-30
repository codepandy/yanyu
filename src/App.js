import React, { useState, useEffect } from 'react'
import './App.css'
import { list } from './data.json'

const read_time_key = 'read_time_key'
const record_index_key = 'record_index_key'
function App() {
	const [ info, setInfo ] = useState({})

	useEffect(() => {
		const time = +(localStorage.getItem(read_time_key) || 0)
		const index = +(localStorage.getItem(record_index_key) || 0)
		const now = Date.now()
		if (time && now - time > 1000 * 60 * 60 * 24) {
			localStorage.setItem(record_index_key, `${index + 1}`)
			setInfo({ ...list[index + 1] })
		} else {
			localStorage.setItem(read_time_key, now)
			localStorage.setItem(record_index_key, '0')
			setInfo({ ...list[0] })
		}
	}, [])
	return (
		<div className="App">
			<section className="content">{info.text}</section>
		</div>
	)
}

export default App