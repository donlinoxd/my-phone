import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TProduct } from '@/rtk/features/commonSlice'

export type RepairPayload = TInitialState['payload']

interface TInitialState {
    step: number
    completedStep: number
    payload: {
        brand?: string
        model?: TProduct
        device_issue?: string
        service_type?: string
        schedule?: {
            time: string
            schedule: string
        }
        reach_form_inputs?: {
            firstName: string
            lastName: string
            email: string
            phoneNumber: string
        }
    }
}

const initialState: TInitialState = {
    step: 1,
    completedStep: 1,
    payload: {},
}

const repairSlice = createSlice({
    name: 'repair',
    initialState,
    reducers: {
        nextStep: (state, action: PayloadAction<RepairPayload>) => {
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
        resetState: (state) => {
            state.step = initialState.step
            state.completedStep = initialState.completedStep
            state.payload = initialState.payload
        },
    },
})

export const { nextStep, setStep, resetState } = repairSlice.actions
export default repairSlice.reducer
