import { MdClose } from 'react-icons/md'

// local modules
import { useCountDown } from '@/hooks/useCountDown'
import useToast from '@/hooks/useToast'
import axios from '@/lib/axios'
import { toggleAuthForm } from '@/rtk/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/forgotPassword.module.scss'

const ForgotPassword = () => {
    const dispatch = useAppDispatch()
    const { theme } = useAppSelector((state) => state.theme)
    const [counter, start] = useCountDown(120)
    const toast = useToast()

    const submitHandler: React.FormEventHandler = async (e) => {
        e.preventDefault()

        const values = new FormData(e.target as HTMLFormElement)

        const { email } = Object.fromEntries(values.entries())

        try {
            start()
            const result = await axios(`/auth/send-verification?emailAddress=${email}&type=reset`)

            if (result.status >= 200 && result.status <= 299) {
                toast.success('Success! Check your email.')
            } else {
                toast.error('Error! Please try again later')
            }
        } catch (error) {
            console.log(error)
            toast.error('Error! Please try again later.')
        }
    }

    return (
        <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
            <form className={styles.form} onSubmit={submitHandler}>
                <h3>Forgot Password</h3>
                <p>Enter the email address associated with your account and we&lsquo;ll send you a linke to reset your password.</p>
                <input type='email' placeholder='Email' name='email' />
                <button disabled={!!counter}>Request Password Reset</button>
                {!!counter && <div className={styles.timer}>try again in {counter}s</div>}
                <span className={styles.divider} />
                <span>
                    <strong onClick={() => dispatch(toggleAuthForm('login'))}>Back to Login</strong>
                </span>
                <div className={`${styles.close} form_close`}>
                    <MdClose />
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
