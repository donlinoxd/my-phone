import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Layout from '@/components/Layout'
import { persistor, store } from '@/rtk/store'
import '@/styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    )
}

export default MyApp
