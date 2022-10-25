import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartTab } from '@/rtk/features/buySlice'
import { TProduct } from '@/rtk/features/commonSlice'

export type SellPayload = TInitialState['payload']
interface TInitialState {
    step: number
    completedStep: number
    tab: CartTab
    payload: {
        brand?: string
        model?: TProduct
        device_details?: {
            condition: string
            carrier: string
            storage: string
            phone_status: string
            back_crack: string
            front_crack: string
            icloud_on: string
        }
    }
}

const initialState: TInitialState = {
    step: 1,
    completedStep: 1,
    tab: 'cart',
    payload: {},
}

const sellSlice = createSlice({
    name: 'sell',
    initialState,
    reducers: {
        nextStep: (state, action: PayloadAction<SellPayload>) => {
            state.completedStep = state.step + 1
            state.step = state.step + 1
            state.payload = {
                ...state.payload,
                ...action.payload,
            }
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload
            state.completedStep = action.payload
        },
        setTab: (state, action: PayloadAction<CartTab>) => {
            state.tab = action.payload
        },
    },
})

export const { nextStep, setStep, setTab } = sellSlice.actions
export default sellSlice.reducer
