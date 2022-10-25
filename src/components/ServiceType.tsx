import Image from 'next/image'
import { MdKeyboardArrowRight } from 'react-icons/md'

// local modules
import { nextStep } from '@/rtk/features/repairSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/serviceType.module.scss'

// local static files
import badge from '@/images/web_badge.png'
import fivestars from '@/images/web_fivestars.png'
import phonetilt_1 from '@/images/web_phonetilt1.png'
import phonetilt_2 from '@/images/web_phonetilt2.png'
import timecheck from '@/images/web_timecheck.png'
import warrantychecks from '@/images/web_warrantycheck.png'

const ServiceType = () => {
    const { theme } = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    return (
        <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.header}>
                <h1>How do you want to get your cellphone fixed?</h1>
                <span>Here&rsquo;s what&rsquo;s available in your area: </span>

                <div className={styles.card_wrapper}>
                    <div className={styles.card} onClick={() => dispatch(nextStep({ service_type: 'carry-in' }))}>
                        <div className={styles.content}>
                            <strong>Carry-In</strong>
                            <p>
                                Phone repairs in 4 hours or <br /> less. Free diagnostics.
                            </p>
                        </div>
                        <MdKeyboardArrowRight />
                    </div>
                    <div className={styles.card} onClick={() => dispatch(nextStep({ service_type: 'come to you' }))}>
                        <div className={styles.content}>
                            <strong>We Come to You</strong>
                            <p>
                                Phone repairs in 2 hours or <br /> less. Deposit required.
                            </p>
                        </div>
                        <MdKeyboardArrowRight />
                    </div>
                    <div className={styles.card} onClick={() => dispatch(nextStep({ service_type: 'mail-in' }))}>
                        <div className={styles.content}>
                            <strong>Mail-in Repair</strong>
                            <p>
                                Free shipping both ways and repairs <br /> are completed in less than a week.
                            </p>
                        </div>
                        <MdKeyboardArrowRight />
                    </div>
                    <div className={styles.background_1}>
                        <Image src={phonetilt_1} alt='Tilted Phone' />
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image src={warrantychecks} alt='Badge with check' />
                    </div>
                    <span>LIFETIME WARRANTY</span>
                </div>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image src={badge} alt='Award Badge' />
                    </div>
                    <span>EXPERT TECHNICIANS</span>
                </div>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image src={timecheck} alt='Clock with check mark' />
                    </div>
                    <span>SAME DAY REPAIRS</span>
                </div>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image src={fivestars} alt='Five Stars' />
                    </div>
                    <span>1M+ DEVICES FIXED</span>
                </div>
                <div className={styles.background_2}>
                    <Image src={phonetilt_2} alt='Tilted Phone' />
                </div>
            </div>
        </section>
    )
}

export default ServiceType
