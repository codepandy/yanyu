import { useState } from "react";
import "./Dialog.css";

const record_index_key = "record_index_key";
export default function Dialog(props) {
  const { visible, onCloseDialog } = props;
  console.log(localStorage.getItem(record_index_key), "dddd");
  const [index, setIndex] = useState(
    localStorage.getItem(record_index_key) || "0"
  );
  const onChangeIndex = function (e) {
    setIndex(e.target.value);
  };
  const onSubmit = () => {
    localStorage.setItem(record_index_key, index);
    onCloseDialog();
  };
  return (
    <div
      className="dialog-container"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <section className="dialog-content">
        <img
          src="http://img.wangpengpeng.site/close.svg"
          alt="关闭"
          className="dialog-close"
          onClick={onCloseDialog}
        />
        <input className="input-text" value={index} onChange={onChangeIndex} />
        <input
          type="button"
          value="确定"
          className="btn-ok"
          onClick={onSubmit}
        />
      </section>
    </div>
  );
}
