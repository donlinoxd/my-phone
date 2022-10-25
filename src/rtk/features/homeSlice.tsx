import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type HomeTab = 'buy' | 'sell' | 'repair'

interface TInitialState {
    tab: HomeTab
}

const initialState: TInitialState = {
    tab: 'buy',
}

const buySlice = createSlice({
    name: 'buy',
    initialState,
    reducers: {
        setTab: (state, action: PayloadAction<HomeTab>) => {
            state.tab = action.payload
        },
    },
})

export const { setTab } = buySlice.actions
export default buySlice.reducer
