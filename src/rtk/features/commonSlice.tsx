import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TProduct {
    _id: string
    model: string
    brand: string
    imageUrl: string
    carrier: string[]
    condition: string[]
    storage: string[]
    color: string[]
    price?: number
}

export interface TBrands {
    _id: string
    brand: string
    imageUrl: string
}

interface TInitialState {
    loading: boolean
    products: TProduct[]
    brands: TBrands[]
}

const initialState: TInitialState = {
    loading: false,
    brands: [],
    products: [],
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setProducts: (state, action: PayloadAction<TProduct[]>) => {
            state.products = action.payload
        },
        setBrands: (state, action: PayloadAction<TBrands[]>) => {
            state.brands = action.payload
        },
    },
})

export const { setLoading, setProducts, setBrands } = commonSlice.actions
export default commonSlice.reducer
