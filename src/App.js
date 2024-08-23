import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DonutChart from './Doughnut';
import Modal from './modal';
import { addWidget, removeWidget } from './redux/widgetsSlice';

function App() {
  const dispatch = useDispatch();
  const { dataCSPM, dataCWPP } = useSelector((state) => state.widgets);
  const [charts, setCharts] = useState([]);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("CSPM");
  const [searchCSPM, setSearchCSPM] = useState("");
  const [searchCWPP, setSearchCWPP] = useState("");

  const toggleSlideover = (category) => {
    setActiveCategory(category);
    setIsVisible(!isVisible);
  };

  const filteredCSPM = dataCSPM.filter(item =>
    item.datasets[0]?.label.toLowerCase().includes(searchCSPM.toLowerCase())
  );

  const filteredCWPP = dataCWPP.filter(item =>
    item.datasets[0]?.label.toLowerCase().includes(searchCWPP.toLowerCase())
  );

  return (
    <div className='ml-4 p-2'>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold m-2'>CSPM</h2>
        <input
          type="text"
          placeholder="🔎 Search CSPM Widgets"
          value={searchCSPM}
          onChange={(e) => setSearchCSPM(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-52"
        />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {filteredCSPM.map((item, index) => (
    <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <div className='flex justify-between items-center mb-4 w-full'>
        <p className='text-black text-lg font-medium'>{item.datasets[0]?.label || "No Label"}</p>
        <button 
          onClick={() => dispatch(removeWidget({ category: 'CSPM', index }))} 
          className='text-white border rounded-full px-1 py-1 bg-black'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>

        </button>
      </div>
      <DonutChart data={{ labels: item.labels, datasets: item.datasets }} />
    </div>
  ))}
  <div className="bg-white shadow-md rounded-lg p-4 flex justify-center items-center">
    <button className="text-gray-400 rounded p-3 border border-gray-400" onClick={() => toggleSlideover("CSPM")}>
      + ADD WIDGET
    </button>
  </div>
</div>


      </div>

      <div>
        <h2 className='text-2xl font-bold m-2'>CWPP</h2>
        <input
          type="text"
          placeholder="🔎 Search CWPP Widgets"
          value={searchCWPP}
          onChange={(e) => setSearchCWPP(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-52"
        />
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {filteredCWPP.map((item, index) => (
    <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <div className='flex justify-between items-center mb-4 w-full'>
        <p className='text-black text-lg font-medium'>{item.datasets[0]?.label || "No Label"}</p>
        <button 
          onClick={() => dispatch(removeWidget({ category: 'CWPP', index }))} 
          className='text-white border rounded-full px-1 py-1 bg-black'>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>

        </button>
      </div>
  
      <DonutChart data={{ labels: item.labels, datasets: item.datasets }} />
   
    </div>
  ))}
  <div className="bg-white shadow-md rounded-lg p-4 flex justify-center items-center">
    <button className="text-gray-400 rounded p-3 border border-gray-400" onClick={() => toggleSlideover("CWPP")}>
      + ADD WIDGET
    </button>
  </div>
</div>
      </div>

      {/* Slideover Modal */}
      <div
        id="slideover-container"
        className={`w-full h-full fixed inset-0 ${isVisible ? 'visible' : 'invisible'}`}
        onClick={() => setIsVisible(false)} // Close the slideover when clicking outside
      >
        <div
          id="slideover-bg"
          className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
        />
        <div
          id="slideover"
          className={`w-3/6 bg-white h-full absolute right-0 duration-300 ease-out transition-all ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()} // Prevent click events from closing the slideover
        >
          {isVisible && (
            <Modal
              activeCategory={activeCategory}
              error={error}
              dataCSPM={dataCSPM}
              dataCWPP={dataCWPP}
              charts={charts}
              toggleSlideover={(state) => {
                if (!state) {
                  setActiveCategory("CSPM");
                }
                toggleSlideover(state);
              }}
              setCharts={setCharts}
              setError={setError}
              setDataCSPM={(newData) => dispatch(addWidget({ category: 'CSPM', newData }))}
              setDataCWPP={(newData) => dispatch(addWidget({ category: 'CWPP', newData }))}
              setActiveCategory={setActiveCategory} 
            />
          )}
        
        </div>
      </div>
    </div>
  );
}

export default App;
