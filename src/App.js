import React, { useState, useEffect } from 'react'
import './App.css'
import { list } from './data.json'
import Dialog from "./Dialog";

const read_time_key = 'read_time_key'
const record_index_key = 'record_index_key'
const pageSize = 30
const len = list.length;
const pageCount = Math.ceil(list.length / pageSize)
function App() {
	const params = new URL(document.location).searchParams
	const initIndex = params.get('index')
	if (initIndex) {
		localStorage.setItem(record_index_key, initIndex)
	}
	const index = +(localStorage.getItem(record_index_key) || 0)
	const [info, setInfo] = useState({ ...list[index] })
	const [showText, setShowText] = useState(true)
	const [pageIndex, setPageIndex] = useState(0)
	const [visibleVideo, setVisibleVideo] = useState(false)
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
		// setShowText(!showText)
	}
	const onNextPage = (e) => {
		e.stopPropagation()
		setPageIndex(pageIndex + 1)
	}
	const onPrePage = (e) => {
		e.stopPropagation()
		setPageIndex(pageIndex - 1)
	}
	const onShowVideo = () => {
		setVisibleVideo(true)
	}
	const onCloseDialog = () => {
		setVisibleVideo(false)
	}

	return (
		<div className="container">
			{showText ? (
				<div className="App">
					<section className="content">{info.text}</section>
					<section className="index" onClick={onShowVideo}>{index}</section>
					<section className="length" >{len}</section>
					<Dialog visible={visibleVideo} onCloseDialog={onCloseDialog} />
				</div>
			) : (
					<div className="list-block">
						{list
							.slice(20 * pageIndex, (pageIndex + 1) * pageSize)
							.map((item, index) => (
								<section key={item.text} className="row">{`${index +
									1 +
									pageIndex * pageSize}.${item.text}`}</section>
							))}
						<section className="footer">
							<div className="btn-page" onClick={onPrePage}>
								上一页
						</div>
							<div className="page-text">{`${pageIndex + 1}/${pageCount}`}</div>
							<div className="btn-page" onClick={onNextPage}>
								下一页
						</div>
						</section>
					</div>
				)}
		</div>
	)
}

export default App
