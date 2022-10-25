import { NextPage } from 'next'
import Image from 'next/image'

// local modules
import IconButton from '@/components/IconButton'
import axios from '@/lib/axios'
import { CartTab } from '@/rtk/features/buySlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/checkout.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

// local static files
import fedex from '@/images/web_fedex.png'
import paypal from '@/images/web_paypal.png'
import stripe from '@/images/web_stripe.png'
import ups from '@/images/web_ups.png'
import uspostal from '@/images/web_uspostal.png'

interface CheckoutProps {
    setTab: ActionCreatorWithPayload<CartTab>
    imageUrl: string
    model: string
    color: string
}

const Checkout: NextPage<CheckoutProps> = ({ setTab, color, imageUrl, model }) => {
    const { theme } = useAppSelector((state) => state.theme)
    const { payload } = useAppSelector((state) => state.buy)
    const dispatch = useAppDispatch()

    const paypalHandler = async () => {
        try {
            const result = await axios.post('/payment/paypal/create-orders', { amount: 100 })

            console.log(result)
        } catch (error) {}
    }

    return (
        <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
            <form>
                <div className={styles.header}>
                    <span>How would you like to be paid?</span>
                    <ul>
                        <li onClick={paypalHandler}>
                            <IconButton image={paypal} name='payment_type' value='paypal' />
                        </li>
                        <li>
                            <IconButton image={stripe} name='payment_type' value='stripe' />
                        </li>
                    </ul>
                </div>
                <div className={styles.header}>
                    <span>How would you like to ship your device?</span>
                    <ul>
                        <li>
                            <IconButton image={fedex} name='shippper' value='fedex' />
                        </li>
                        <li>
                            <IconButton image={uspostal} name='shippper' value='us_portal' />
                        </li>
                        <li>
                            <IconButton image={ups} name='shippper' value='ups' />
                        </li>
                    </ul>
                </div>
                <div className={styles.input_wrapper}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' />
                </div>
                <div className={styles.input_wrapper}>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' id='email' name='email' />
                </div>
                <div className={styles.input_wrapper}>
                    <label htmlFor='houseNumber'>House Number & StreetName</label>
                    <input type='text' id='houseNumber' name='houseNumber' />
                </div>
                <div className={`${styles.input_wrapper} ${styles.shrink}`}>
                    <label htmlFor='apartment'>Apartment, Suite</label>
                    <input type='text' id='apartment' name='apartment' />
                </div>
                <div className={`${styles.input_wrapper} ${styles.shrink}`}>
                    <label htmlFor='town'>Town</label>
                    <input type='text' id='town' name='town' />
                </div>
                <div className={`${styles.input_wrapper} ${styles.shrink}`}>
                    <label htmlFor='zip'>ZIP</label>
                    <input type='text' id='zip' name='zip' />
                </div>
                <div className={`${styles.input_wrapper} ${styles.shrink}`}>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input type='text' id='phoneNumber' name='phoneNumber' />
                </div>

                <div className={styles.button}>
                    <button onClick={() => dispatch(setTab('confirmation'))}>PROCEED</button>
                </div>
            </form>

            <div className={styles.order_summary}>
                <div className={styles.title}>
                    <h3>Order Summary</h3>
                </div>
                <div className={styles.header}>
                    <strong>Price</strong>
                    <span>300.00$</span>
                    <strong>Shipping</strong>
                    <span>free</span>
                    <strong>Tax</strong>
                    <span>5%</span>
                </div>
                <div className={styles.footer}>
                    <div className={styles.image}>
                        <Image src={imageUrl} layout='responsive' width='100%' objectFit='contain' height='100%' alt='Iphone' />
                    </div>
                    <div className={styles.details}>
                        <strong>{model}</strong>
                        <div>
                            {color && (
                                <>
                                    <span className={styles.color} style={{ background: payload.device_details?.color.split('.')[0] }} />
                                    <span>{payload.device_details?.color.split('.')[1]}</span>
                                </>
                            )}
                            <span>1x</span>
                            <span>$310.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
