// local modules
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'
import Confirmation from '@/components/Confirmation'
import { CartTab } from '@/rtk/features/buySlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/cart.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface CartProps {
    tab: CartTab
    setTab: ActionCreatorWithPayload<CartTab>
    values: {
        brand: string
        model: string
        imageUrl: string
        condition: string
        carrier: string
        storage: string
        color?: string
    }
}

const MyCart = ({ tab, setTab, values }: CartProps) => {
    const { theme } = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    return (
        <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark} `}>
            <div className={styles.header}>
                <strong className={`${tab === 'cart' ? styles.active : null}`} onClick={() => dispatch(setTab('cart'))}>
                    Cart
                </strong>
                <strong className={`${tab === 'checkout' ? styles.active : null}`} onClick={() => dispatch(setTab('checkout'))}>
                    Checkout
                </strong>
                <strong className={`${tab === 'confirmation' ? styles.active : null}`} onClick={() => dispatch(setTab('confirmation'))}>
                    Confirmation
                </strong>
            </div>
            {tab === 'cart' && <Cart values={values} setTab={setTab} />}
            {tab === 'checkout' && (
                <Checkout color={values.color!} imageUrl={values.imageUrl} model={`${values.brand} ${values.model}`} setTab={setTab} />
            )}
            {tab === 'confirmation' && <Confirmation />}
        </section>
    )
}

export default MyCart
