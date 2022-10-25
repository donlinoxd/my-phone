import { MdClose } from 'react-icons/md'

// local modules
import useToast from '@/hooks/useToast'
import axios from '@/lib/axios'
import { toggleAuthForm } from '@/rtk/features/authSlice'
import { setLoading } from '@/rtk/features/commonSlice'
import { loginValues } from '@/rtk/features/formSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/loginForm.module.scss'
import { useRouter } from 'next/router'

const LoginForm = () => {
    const { values } = useAppSelector((state) => state.form.login)
    const { theme } = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const toast = useToast()

    const submitHandler: React.FormEventHandler = async (e) => {
        e.preventDefault()

        dispatch(setLoading(true))
        try {
            const result = await axios.post('/auth/signin', values)

            if (result.status >= 200 && result.status <= 299) {
                dispatch(toggleAuthForm(false))
                dispatch(setLoading(false))
                router.pathname === '/verify' ? router.push('/') : router.back()
            } else {
                dispatch(setLoading(false))
                throw new Error(result.statusText)
            }
        } catch (error) {
            toast.error('Invalid email or password')
        }
    }

    return (
        <div className={`${styles.container} ${theme === 'light' ? null : styles.dark} form_close`}>
            <form className={styles.form} onSubmit={submitHandler}>
                <h3>Login Your Account</h3>
                <input
                    type='text'
                    placeholder='Email'
                    value={values.emailAddress}
                    onChange={(e) => dispatch(loginValues({ emailAddress: e.target.value }))}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={values.password}
                    onChange={(e) => dispatch(loginValues({ password: e.target.value }))}
                />
                <button disabled={!values.password || !values.emailAddress}>Login</button>
                <span className={styles.forgot} onClick={() => dispatch(toggleAuthForm('forgotPassword'))}>
                    Forgot password?
                </span>
                <span className={styles.divider} />
                <span>
                    Not a member? <strong onClick={() => dispatch(toggleAuthForm('register'))}>Create an account.</strong>
                </span>

                <div className={`${styles.close} form_close`}>
                    <MdClose />
                </div>
            </form>
        </div>
    )
}

export default LoginForm
