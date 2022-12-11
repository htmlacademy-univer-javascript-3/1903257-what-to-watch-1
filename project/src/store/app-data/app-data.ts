import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

type AppData = {
    error: string | null
}

const initialState: AppData = {
  error: null
};

export const appDataSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setError } = appDataSlice.actions;
export default appDataSlice.reducer;
