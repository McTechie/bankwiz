import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDarkMode: false,
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggle: state => {
      state.isDarkMode = !state.isDarkMode
    },
    setMode: (state, action) => {
      state.isDarkMode = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggle, setMode } = darkModeSlice.actions

export default darkModeSlice.reducer
