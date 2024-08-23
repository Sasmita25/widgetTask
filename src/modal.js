import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from './redux/widgetsSlice';

export default function Modal({
  activeCategory,
  error,
  toggleSlideover,
  setCharts,
  dataCSPM,
  dataCWPP,
  setActiveCategory,
}) {
  const dispatch = useDispatch();
  const [labels, setLabels] = useState("");
  const [label, setLabel] = useState("");
  const [datan, setDatan] = useState("");
  const [color, setColor] = useState("");
  const [obj, setObj] = useState({
    labels: [],
    label: "",
    color: [],
    datan: []
  });

  function handleAddData(e) {
    e.preventDefault();
    const newData = {
      labels: obj.labels,
      datasets: [{
        label: obj.label,
        data: obj.datan,
        backgroundColor: obj.color,
        borderColor: obj.color,
        borderWidth: 1
      }]
    };

    dispatch(addWidget({ category: activeCategory, newData }));

    setCharts(charts => ([...charts, {}]));
    setObj({ labels: [], label: "", color: [], datan: [] });
    toggleSlideover(false); 
  }

  function handlePr(e) {
    e.preventDefault();
    setObj(prev => ({
      ...prev,
      labels: [...prev.labels, labels],
      label: label,
      color: [...prev.color, color],
      datan: [...prev.datan, datan]
    }));
    setLabels("");
    setColor("");
    setDatan("");
  }

  const handleTabClick = (category) => {
    if (category !== activeCategory) {
      setObj({ labels: [], label: "", color: [], datan: [] });
      setLabel("");
      setLabels("");
      setDatan("");
      setColor("");
      setActiveCategory(category);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-screen overflow-auto relative">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{activeCategory} Widgets</h2>

          <div className="mb-4 flex space-x-2 sm:space-x-4 border-b">
            <button
              onClick={() => handleTabClick("CSPM")}
              className={`px-3 py-2 sm:px-4 sm:py-2 ${activeCategory === "CSPM" ? "border-b-2 border-blue-500 font-bold" : "border-b-2 border-transparent"}`}
            >
              CSPM
            </button>
            <button
              onClick={() => handleTabClick("CWPP")}
              className={`px-3 py-2 sm:px-4 sm:py-2 ${activeCategory === "CWPP" ? "border-b-2 border-blue-500 font-bold" : "border-b-2 border-transparent"}`}
            >
              CWPP
            </button>
          </div>

          <ul className="list-disc pl-4 sm:pl-5 space-y-1">
            {(activeCategory === "CSPM" ? dataCSPM : dataCWPP).map((item, i) => (
              <li key={i} className="text-gray-700 text-sm sm:text-base">{item.datasets[0]?.label}</li>
            ))}
          </ul>
        </div>

        <form className="p-4 space-y-4">
          <div>
            <label className="block font-medium mb-1">WIDGET NAME: {obj?.label}</label>
          
            <div className="flex flex-col mb-4 space-y-2">
              {obj?.labels.map((label, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="text-gray-700 text-sm sm:text-base">{`LABEL ${i + 1}: ${label}`}</div>
                  <div
                    className="w-4 h-4 border border-gray-300"
                    style={{ backgroundColor: obj.color[i] }}
                  ></div>
                </div>
              ))}
            </div>
            {obj?.label === "" && (
              <input
                type="text"
                onChange={(e) => setLabel(e.target.value)}
                value={label}
                className="border border-gray-300 rounded p-2 w-full"
              />
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">LABEL:</label>
            <input
              type="text"
              onChange={(e) => setLabels(e.target.value)}
              value={labels}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">VAL:</label>
            <input
              type="number"
              onChange={(e) => setDatan(Number(e.target.value))}
              value={datan}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Color:</label>
            <input
              type="color"
              className="border p-2 w-full"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
            <div
              className="mt-2 w-full h-12 border border-gray-300"
              style={{ backgroundColor: color }}
            ></div>
          </div>

          <button
            onClick={handlePr}
            className="w-full px-4 py-2 bg-blue-300 text-blue-800 rounded"
          >
            Add Label
          </button>

          <button
            onClick={handleAddData}
            type="submit"
            className="w-full px-4 py-2 bg-green-300 text-green-800  rounded"
          >
            SUBMIT
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <button
          onClick={() => toggleSlideover(false)}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
}
