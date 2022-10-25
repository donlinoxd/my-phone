import Image from 'next/image'
import { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

// images
import { generateCondition } from '@/components/BuyDetails'
import { CartTab } from '@/rtk/features/buySlice'
import { useAppDispatch } from '@/rtk/hook'
import styles from '@/styles/pages/cart.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface CartProps {
    setTab: ActionCreatorWithPayload<CartTab>
    values: {
        brand: string
        model: string
        imageUrl: string
        condition: string
        carrier: string
        storage: string
    }
}

const Cart = ({ setTab, values }: CartProps) => {
    const dispatch = useAppDispatch()
    const [quantity, setQuantity] = useState(1)

    return (
        <>
            <div className={styles.title}>My Cart</div>
            <table>
                <thead>
                    <tr className={styles.table_row}>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.table_row}>
                        <td className={styles.product}>
                            <strong className={styles.content_title}>
                                {values.brand} {values.model}
                            </strong>
                            <div className={styles.content_wrapper}>
                                <div className={styles.image}>
                                    <Image
                                        src={values.imageUrl}
                                        width='100%'
                                        height='100%'
                                        objectFit='contain'
                                        layout='responsive'
                                        alt='Iphone 13 Pro Max'
                                    />
                                </div>
                                <strong>
                                    {values.brand} {values.model}
                                </strong>
                                <div className={styles.details}>
                                    {values.condition && (
                                        <div>
                                            <strong>Condition: </strong>
                                            <span>{generateCondition(values.condition)}</span>
                                        </div>
                                    )}
                                    {values.carrier && (
                                        <div>
                                            <strong>Carrier: </strong>
                                            <span>{values.carrier?.toUpperCase()}</span>
                                        </div>
                                    )}
                                    {values.storage && (
                                        <div>
                                            <strong>Storage </strong>
                                            <span>{values.storage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </td>
                        <td className={styles.price}>
                            <span>310.00$</span>
                        </td>
                        <td className={styles.button}>
                            <div
                                className={styles.icon}
                                onClick={() => {
                                    if (quantity === 1) return
                                    setQuantity((quantity) => --quantity)
                                }}
                            >
                                <FaMinus />
                            </div>
                            <span>{quantity}</span>
                            <div className={styles.icon} onClick={() => setQuantity((quantity) => ++quantity)}>
                                <FaPlus />
                            </div>
                        </td>
                        <td className={styles.price}>
                            <span>310.00$</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className={styles.footer}>
                <div className={styles.total_wrapper}>
                    <div className={styles.subtotal}>
                        <strong>Subtotal</strong>
                        <span>310.00$</span>
                        <strong>Shipping</strong>
                        <span>0.5%</span>
                    </div>
                    <div className={styles.total}>
                        <strong>Total</strong>
                        <span>310.00$</span>
                    </div>
                </div>

                <button className={styles.button} onClick={() => dispatch(setTab('checkout'))}>
                    PROCEED TO CHECKOUT
                </button>
            </div>
        </>
    )
}

export default Cart
