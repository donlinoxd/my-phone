import Head from 'next/head'

// local modules
import Footer from '@/components/Footer'
import ForgotPassword from '@/components/ForgotPassword'
import LoginForm from '@/components/LoginForm'
import Modal from '@/components/Modal'
import Nav from '@/components/Nav'
import RegisterForm from '@/components/RegisterForm'
import Toast from '@/components/Toast'
import UpdatePassword from '@/components/UpdatePassword'
import { toggleAuthForm } from '@/rtk/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/layout.module.scss'

interface LayoutProps {
    children: React.ReactNode | any
}

const Layout = ({ children }: LayoutProps) => {
    const { authFormOpen } = useAppSelector((state) => state.auth)
    const { theme } = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    const closeHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const target = e.target as HTMLDivElement

        if (target.classList.contains('form_close')) {
            return dispatch(toggleAuthForm(false))
        }
    }

    const authForms: Record<Exclude<typeof authFormOpen, false>, JSX.Element> = {
        login: <LoginForm />,
        register: <RegisterForm />,
        forgotPassword: <ForgotPassword />,
        updatePassword: <UpdatePassword />,
    }

    return (
        <>
            <Head>
                <meta name='theme-color' content='#10c1e4' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
                <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
                <meta name='msapplication-TileColor' content='#00aba9' />
            </Head>
            <Nav />
            <div className={`${styles.layout} ${theme === 'light' ? styles.light : styles.dark}`}>
                <div className='container'>
                    {children}
                    {authFormOpen && (
                        <div className={`${styles.auth_form} form_close`} onClick={closeHandler}>
                            {authForms[authFormOpen]}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <Modal />
            <Toast />
        </>
    )
}

export default Layout
