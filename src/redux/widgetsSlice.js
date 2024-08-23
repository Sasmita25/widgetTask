import { createSlice } from '@reduxjs/toolkit';
import exdataCSPM from '../exdataCSPM.json';
import exdataCWPP from '../exdataCWPP.json';

const initialState = {
  dataCSPM: exdataCSPM,
  dataCWPP: exdataCWPP,
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { category, newData } = action.payload;
      if (category === 'CSPM') {
        state.dataCSPM.push(newData);
      } else if (category === 'CWPP') {
        state.dataCWPP.push(newData);
      }
    },
    removeWidget: (state, action) => {
      const { category, index } = action.payload;
      if (category === 'CSPM') {
        state.dataCSPM.splice(index, 1);
      } else if (category === 'CWPP') {
        state.dataCWPP.splice(index, 1);
      }
    },
  },
});

export const { addWidget, removeWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;
