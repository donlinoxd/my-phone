import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TInitialState {
    tab: 'sell' | 'buy' | 'repair'
    filter: 'all' | 'pending' | 'completed'
}

const initialState: TInitialState = {
    tab: 'sell',
    filter: 'all',
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setTab: (state, action: PayloadAction<TInitialState['tab']>) => {
            state.tab = action.payload
        },
        setFilter: (state, action: PayloadAction<TInitialState['filter']>) => {
            state.filter = action.payload
        },
    },
})

export const { setTab, setFilter } = orderSlice.actions
export default orderSlice.reducer
