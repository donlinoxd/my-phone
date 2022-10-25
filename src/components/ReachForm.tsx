import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

// local modules
import routes from '@/constants/routes'
import useToast from '@/hooks/useToast'
import { setLoading } from '@/rtk/features/commonSlice'
import { resetState } from '@/rtk/features/repairSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/reachForm.module.scss'

// local static files
import appointment from '@/images/web_appointment.png'
import controller from '@/images/web_controller.png'
import headphone from '@/images/web_headphone.png'
import location from '@/images/web_location.png'

const ReachForm = () => {
    const { theme } = useAppSelector((state) => state.theme)
    const { loading } = useAppSelector((state) => state.common)
    const dispatch = useAppDispatch()
    const toast = useToast()
    const router = useRouter()

    const confirmAppointment: React.FormEventHandler = (e) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)

        const values = Object.fromEntries(data.entries())

        if (!values.firstName || !values.lastName || !values.email || !values.tel) return toast.error('Fill in all fields.')

        dispatch(setLoading(true))

        setTimeout(() => {
            dispatch(setLoading(false))
            router.push(routes.HOME)
            toast.success('Appoinment Confirm! Please check your email.', 5000)
            dispatch(resetState())
        }, 3000)
    }

    return (
        <form onSubmit={confirmAppointment} className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
            <h1>Last Step! How Can We Reach You?</h1>
            <div className={styles.form}>
                <div className={styles.input}>
                    <input type='text' placeholder='First Name' name='firstName' />
                    <input type='text' placeholder='Last Name' name='lastName' />
                    <input type='email' placeholder='Email' name='email' />
                    <input type='number' placeholder='Phone Number' name='tel' />
                </div>
                <div className={styles.contact_me}>
                    <h4>You can contact me by</h4>
                    <div className={styles.checkbox_wrapper}>
                        <div className={styles.checkbox}>
                            <input type='checkbox' name='contactBy' id='phoneCall' />
                            <label htmlFor='phoneCall'>Phone Call</label>
                        </div>
                        <div className={styles.checkbox}>
                            <input type='checkbox' name='contactBy' id='email' />
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className={styles.checkbox}>
                            <input type='checkbox' name='contactBy' id='sms' />
                            <label htmlFor='sms'>SMS/text</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div>
                    <h4>Appointment Time</h4>
                    <div>
                        <div className={styles.icon}>
                            <Image src={appointment} alt='Appointment icon' />
                        </div>
                        <div className={styles.content}>
                            <span>Tue, May 11, 2022</span>
                            <span>12 pm</span>
                            <button>Change Time</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Repair Location</h4>
                    <div>
                        <div className={styles.icon}>
                            <Image src={location} alt='Location icon' />
                        </div>
                        <div className={styles.content}>
                            <span>New York - Center City</span>
                            <span>1135 walnut street, #100A Philadelphia, PA 1265</span>
                            <button>Change Store</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type='submit' className={styles.button}>
                CONFIRM YOUR REPAIR APPOINTMENT
            </button>
            <div className={styles.background}>
                <div className={styles.image1}>
                    <Image src={headphone} alt='HeadPhone' />
                </div>
                <div className={styles.image2}>
                    <Image src={controller} alt='HeadPhone' />
                </div>
            </div>
            {loading && (
                <span className={styles.loading}>
                    <AiOutlineLoading3Quarters fontSize='2.5rem' />
                </span>
            )}
        </form>
    )
}

export default ReachForm
