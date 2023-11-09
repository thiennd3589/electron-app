import { useEffect, useState } from "react";
import "./App.css";
import CountDown from "./components/CountDown";
import Modal from "./components/update/Modal";

function App() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(
    localStorage.getItem("time") ? Number(localStorage.getItem("time")) : 5
  );
  const [start, setStart] = useState(false);
  const [timeValue, setTimeValue] = useState("");

  const onConfirm = (time: number) => {
    setTime(time);
    localStorage.setItem("time", time.toString());
    setOpen(false);
  };

  return (
    <div className="w-screen flex justify-center items-center h-screen relative overflow-hidden">
      <div className="absolute w-full h-full -z-10 bg-black">
        <video autoPlay loop className="w-full opacity-50">
          <source src="/video-bg.mp4" />
        </video>
      </div>

      {!start ? (
        <>
          <button
            className="px-7 py-5 text-5xl font-bold bg-transparent uppercase text-white shadow-2xl hover:scale-105 duration-150 tracking-wider rounded-lg cursor-pointer border-0"
            onClick={() => setStart(true)}
          >
            Bắt đầu
          </button>
          <span
            className="absolute right-10 bottom-10 cursor-pointer text-white"
            onClick={() => setOpen((prev) => !prev)}
          >
            Cài đặt
          </span>
        </>
      ) : (
        <CountDown time={time} />
      )}
      <Modal
        title="Cài đặt thời gian"
        open={open}
        onCancel={() => setOpen(false)}
      >
        <div className="mt-5">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              type="number"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              onChange={(e) => setTimeValue(e.currentTarget.value)}
            />
            <label className=" ml-2 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Thời gian (phút)
            </label>
          </div>
          <div className="flex gap-5 mt-5 justify-end">
            <span
              className="border-[2px] cursor-pointer rounded-lg border-blue-600 border-solid px-3 py-2 font-bold text-blue-600"
              onClick={() => setOpen(false)}
            >
              Hủy
            </span>
            <span
              className="border-[2px] cursor-pointer rounded-lg border-blue-600 bg-blue-600 border-solid px-3 py-2 font-bold text-white"
              onClick={() => onConfirm(timeValue ? Number(timeValue) : 5)}
            >
              Xác nhận
            </span>
          </div>
        </div>
      </Modal>
      {/* <CountDown /> */}
    </div>
  );
}

export default App;
