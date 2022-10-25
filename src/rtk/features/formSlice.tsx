import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TInitialState {
    login: {
        values: {
            emailAddress: string
            password: string
        }
    }
    register: {
        values: {
            emailAddress: string
            firstName: string
            lastName: string
            phoneCode: string
            phoneNumber: string
            password: string
            birthDate: string
            gender: 'male' | 'female' | ''
        }
    }
}

const initialState: TInitialState = {
    login: {
        values: {
            emailAddress: '',
            password: '',
        },
    },
    register: {
        values: {
            emailAddress: '',
            firstName: '',
            lastName: '',
            password: '',
            phoneCode: '+93',
            phoneNumber: '',
            birthDate: '',
            gender: '',
        },
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginValues: (state, action: PayloadAction<Partial<TInitialState['login']['values']>>) => {
            state.login.values = {
                ...state.login.values,
                ...action.payload,
            }
        },
        registerValues: (state, action: PayloadAction<Partial<TInitialState['register']['values']>>) => {
            state.register.values = {
                ...state.register.values,
                ...action.payload,
            }
        },
    },
})

export const { loginValues, registerValues } = userSlice.actions
export default userSlice.reducer
