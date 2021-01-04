import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import { list } from './data.json'

const read_time_key = 'read_time_key'
const record_index_key = 'record_index_key'
function App() {
	const index = +(localStorage.getItem(record_index_key) || 0)
	const [ info, setInfo ] = useState({ ...list[index] })

	useEffect(() => {
		const time = localStorage.getItem(read_time_key)
		const nowDate = new Date(new Date().toLocaleDateString()).getTime() // 获取当天凌晨的时间戳
		setInfo({ ...list[index] })
		localStorage.setItem(read_time_key, nowDate)
		if (time && nowDate.toString() !== time) {
			let nextIndex = index + 1
			if (nextIndex === list.length) {
				nextIndex = 0
			}
			localStorage.setItem(record_index_key, `${nextIndex}`)
			setInfo({ ...list[nextIndex] })
		}
	}, [])
	const onDoubleClick = () => {
		localStorage.setItem(record_index_key, '4')
	}
	return (
		<div className="App" onDoubleClick={onDoubleClick}>
			<section className="content">{info.text}</section>
		</div>
	)
}

export default App
