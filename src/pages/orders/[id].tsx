import Image from 'next/image'

// local modules
import { useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/orderDetails.module.scss'

// local static files
import box from '@/images/web_box.png'
import checkmark from '@/images/web_checkmark.png'
import clipboard from '@/images/web_clipboard.png'
import truck from '@/images/web_deliverytruck.png'
import ip13max from '@/images/web_iphone13promax.png'
import process from '@/images/web_process.png'

const OrderDetails = () => {
    const { theme } = useAppSelector((state) => state.theme)

    return (
        <section className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.wrapper}>
                <h3>Order Details</h3>
                <div>
                    <span>
                        Sales Order No: <span>310.00220331134</span>
                    </span>
                    <span>
                        Order Submitted on: <span>Mar 31, 2022 15:47</span>
                    </span>
                </div>
            </div>
            <div className={styles.wrapper}>
                <h3>Order Status: Order Placed</h3>
                <div>
                    <span>You have made a successful reservation, please wait for the express delivery.</span>
                </div>
                <div className={styles.steppers}>
                    <div className={`${styles.step} ${styles.done}`}>
                        <div className={styles.image}>
                            <Image src={clipboard} alt='Board' />
                        </div>
                        <span className={styles.text}>Order Placed</span>
                    </div>
                    <span className={styles.divider} />
                    <div className={styles.step}>
                        <div className={styles.image}>
                            <Image src={truck} alt='Truck' />
                        </div>
                        <span className={styles.text}>Package Sent</span>
                    </div>
                    <span className={styles.divider} />
                    <div className={styles.step}>
                        <div className={styles.image}>
                            <Image src={box} alt='Box' />
                        </div>
                        <span className={styles.text}>Package Received</span>
                    </div>
                    <span className={styles.divider} />
                    <div className={styles.step}>
                        <div className={styles.image}>
                            <Image src={process} alt='Process' />
                        </div>
                        <span className={styles.text}>Processing</span>
                    </div>
                    <span className={styles.divider} />
                    <div className={styles.step}>
                        <div className={styles.image}>
                            <Image src={checkmark} alt='Check Mark' />
                        </div>
                        <span className={styles.text}>Completed</span>
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <h3>Shipping Carrier: Ups</h3>
                <div>
                    <span>
                        Track Number: <span>1zdsw2dx3265asd2fycky0</span>
                    </span>
                    <span>
                        Logistics Information: <span>Mar 31, 2022 16:47 Shipper created a label, Ups has not received the package yet.</span>
                    </span>
                </div>
            </div>
            <div className={styles.wrapper}>
                <h3>Shipping Carrier: Ups</h3>
                <div>
                    <span>
                        Payment Method: <span>Paypal</span>
                    </span>
                    <span>
                        Payment Delivery Account: <span>Hishamhosam202gmail.com</span>
                    </span>
                </div>
            </div>
            <div className={styles.device_wrapper}>
                <h3 className={styles.title}>My Order</h3>
                <table>
                    <thead>
                        <tr className={styles.table_row}>
                            <th>Product</th>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Quote</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.table_row}>
                            <td className={styles.product}>
                                <strong className={styles.content_title}>IPhone 13 Mini</strong>
                                <div className={styles.content_wrapper}>
                                    <div className={styles.image}>
                                        <Image src={ip13max} alt='Iphone 13 Pro Max' />
                                    </div>
                                    <strong>Iphone 13 Mini</strong>
                                    <div className={styles.details}>
                                        <div>
                                            <strong>Condition: </strong>
                                            <span>refurbished</span>
                                        </div>
                                        <div>
                                            <strong>Carrier: </strong>
                                            <span>verizon</span>
                                        </div>
                                        <div>
                                            <strong>Storage </strong>
                                            <span>256GB</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span>1</span>
                            </td>
                            <td>
                                <span>Waiting for drop off</span>
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

                    <button className={styles.button}>CANCEL ORDER</button>
                </div>
            </div>
        </section>
    )
}

export default OrderDetails
