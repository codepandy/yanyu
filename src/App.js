import React, { useState, useEffect } from "react";
import "./App.css";
import { list } from "./data.json";
import Dialog from "./Dialog";
import toast, { Toaster } from "react-hot-toast";

const read_time_key = "read_time_key";
const record_index_key = "record_index_key";
const pageSize = 30;
const len = list.length;
const pageCount = Math.ceil(list.length / pageSize);
function App() {
  const index = +(localStorage.getItem(record_index_key) || 0);
  const [info, setInfo] = useState({ ...list[index] });
  const [showText, setShowText] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleVideo, setVisibleVideo] = useState(false);
  const time = localStorage.getItem(read_time_key);
  const nowDate = new Date(new Date().toLocaleDateString()).getTime(); // 获取当天凌晨的时间戳
  let nextIndex = index;
  if (nowDate.toString() !== time) {
    localStorage.setItem(read_time_key, nowDate);

    if (time) {
      let nextIndex = index + 1;
      if (nextIndex === list.length) {
        nextIndex = 0;
      }
      localStorage.setItem(record_index_key, `${nextIndex}`);
    }
  }
  useEffect(() => {
    setInfo({ ...list[nextIndex] });
  }, [nextIndex]);

  const onDoubleClick = () => {
    // setShowText(!showText)
  };
  const onNextPage = (e) => {
    e.stopPropagation();
    setPageIndex(pageIndex + 1);
  };
  const onPrePage = (e) => {
    e.stopPropagation();
    setPageIndex(pageIndex - 1);
  };
  const onShowVideo = () => {
    setVisibleVideo(true);
  };
  const onCloseDialog = () => {
    setVisibleVideo(false);
  };

  const onCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast("复制成功！", {
        position: "top-center",
        style: {
          backgroundColor: "#323131",
          color: "#ffffff",
        },
        duration: 1000,
      });
    });
  };

  return (
    <>
      <div className="container">
        {showText ? (
          <div className="App">
            <section
              className="yanyu-content"
              onDoubleClick={onCopyToClipboard.bind(this, info.text)}
            >
              {info.text}
            </section>
            <section className="index" onClick={onShowVideo}>
              {index}
            </section>
            <section className="length">{len}</section>
            <Dialog visible={visibleVideo} onCloseDialog={onCloseDialog} />
          </div>
        ) : (
          <div className="list-block">
            {list
              .slice(20 * pageIndex, (pageIndex + 1) * pageSize)
              .map((item, index) => (
                <section key={item.text} className="row">{`${
                  index + 1 + pageIndex * pageSize
                }.${item.text}`}</section>
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
      <Toaster />
    </>
  );
}

export default App;
