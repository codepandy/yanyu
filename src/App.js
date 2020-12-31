import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import { list } from './data.json'

const read_time_key = 'read_time_key'
const record_index_key = 'record_index_key'
function App() {
	const [ info, setInfo ] = useState({})

	useEffect(() => {
		const time = localStorage.getItem(read_time_key)
		const index = +(localStorage.getItem(record_index_key) || 0)
		const nowDate = new Date(new Date().toLocaleDateString()).getTime() // 获取当天凌晨的时间戳

		localStorage.setItem(read_time_key, nowDate)
		if (time && nowDate.toString() !== time) {
			localStorage.setItem(record_index_key, `${index + 1}`)
			setInfo({ ...list[index + 1] })
		} else {
			localStorage.setItem(record_index_key, '0')
			setInfo({ ...list[0] })
		}
	}, [])
	const onDoubleClick = () => {
		localStorage.setItem(record_index_key, '1')
	}
	return (
		<div className="App" onDoubleClick={onDoubleClick}>
			<section className="content">{info.text}</section>
		</div>
	)
}

export default App
