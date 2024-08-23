import React, { useState, useEffect } from 'react';

export default function Addwid({ data,setCharts, mode, setError, setData, error }) {
  const [labels, setLabels] = useState("");
  const [label, setLabel] = useState("");
  const [datan, setDatan] = useState("");
  const [color, setColor] = useState("");
  const [obj, setObj] = useState({ labels: [], label: "", color: [], datan: [] });

  useEffect(() => {
    console.log(obj);
  }, [obj]); 

  function handleAddData(e) {
    e.preventDefault();
    
    setData([...data, {
      labels: obj.labels,
      datasets: [{
        label: obj.label,
        data: obj.datan,
        backgroundColor: obj.color,
        borderColor: obj.color,
        borderWidth: 1
      }]
    }]);

    setCharts(charts => ([...charts, {}])); // This adds an empty object to charts, you might want to update this if not needed

    // Clear the form inputs
    setObj({ labels: [], label: "", color: [], datan: [] });
    mode();
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
    // setLabel("");
    setLabels("");
    setColor("");
    setDatan("");
  }

  return (
    <div className="flex flex-col items-center ">
        <ul>
            {data.map((item,i)=><li>{item.datasets[0]?.label}</li>)}
        </ul>
        <p>WIDGET NAME : {obj?.label}</p>
      <form>
        {obj?.label?"":<><label>WIDGET NAME</label>
        <input type="text" onChange={(e) => setLabel(e.target.value)} value={label} />
        <label>LABELS</label></>}
        <input type="text" onChange={(e) => setLabels(e.target.value)} value={labels} />
        <label>VAL</label>
        <input type="number" onChange={(e) => setDatan(Number(e.target.value))} value={datan} />
        <label>COLOR</label>
        <input type="text" onChange={(e) => setColor(e.target.value)} value={color} />
        <button onClick={handlePr} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          Add Widget
        </button>
        <button onClick={handleAddData} type="submit">SUBMIT</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
  
}
