import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface FlashKey {
    flashKey: string;
}

const initialState: FlashKey = {
    flashKey: '',
};


const FlashKeySlice = createSlice({
          name:'flashKey',
          initialState,
          reducers:{
                      setFlashKey(state, action: PayloadAction<string>) {
                      state.flashKey = action.payload;
                      },
                      clearFlashKey(state) {
                              state.flashKey = '';
                      }
          }
})

export const { setFlashKey, clearFlashKey } = FlashKeySlice.actions;

export default FlashKeySlice.reducer;