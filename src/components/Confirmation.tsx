// local modules
import { useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/confirmation.module.scss'

const Confirmation = () => {
    const { theme } = useAppSelector((state) => state.theme)

    return (
        <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <strong>Hishamhosam20@gmail.com</strong>
                    <div>All email about your order will be sent here</div>
                </div>
                <div className={styles.wrapper}>
                    <strong>
                        Payment details: <span>Cash Card</span>
                    </strong>
                    <div>
                        <span>Hishamhosam20@gmail.com</span>
                        <button>Change</button>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <strong>
                        Shipping Details: <span>United States</span>
                    </strong>
                    <div>
                        <span>
                            Hishamhosam <br /> gaza strip
                        </span>
                        <button>Change</button>
                    </div>
                </div>
                <div className={styles.total}>
                    <strong>Item total</strong>
                    <span>310.00$</span>
                    <strong>Shipping</strong>
                    <span>0.5%</span>
                </div>
                <div className={styles.checkbox}>
                    <input type='checkbox' name='terms' id='terms' />
                    <label htmlFor='terms'>Terms and policy</label>
                </div>
            </div>
            <button className={styles.button}>SUBMIT ORDER</button>
        </div>
    )
}

export default Confirmation
