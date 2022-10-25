import { TProduct } from '@/rtk/features/commonSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartTab = 'cart' | 'checkout' | 'confirmation'

export type BuyPayload = TInitialState['payload']
interface TInitialState {
    step: number
    completedStep: number
    tab: CartTab
    payload: {
        brand?: string
        model?: TProduct
        price?: number
        device_details?: {
            carrier: string
            condition: string
            storage: string
            color: string
        }
    }
    product: any
    variant: any
}

const initialState: TInitialState = {
    step: 1,
    completedStep: 1,
    tab: 'cart',
    payload: {},
    product: null,
    variant: [{ brand: { $regex: null, $options: 'i' } }, { model: { $regex: null, $options: 'i' } }],
}

const buySlice = createSlice({
    name: 'buy',
    initialState,
    reducers: {
        nextStep: (state, action: PayloadAction<BuyPayload>) => {
            state.completedStep = state.step + 1
            state.step = state.step + 1
            state.payload = { ...state.payload, ...action.payload }
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload
            state.completedStep = action.payload
        },
        setTab: (state, action: PayloadAction<CartTab>) => {
            state.tab = action.payload
        },
        setProduct: (state, action) => {
            state.product = action.payload
        },
    },
})

export const { nextStep, setStep, setTab, setProduct } = buySlice.actions
export default buySlice.reducer
