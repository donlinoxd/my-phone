import Image from 'next/image'
import Link from 'next/link'

// local modules
import styles from '@/styles/pages/404.module.scss'

// local static files
import routes from '@/constants/routes'
import notFound from '@/images/web_404.png'
import { useAppSelector } from '@/rtk/hook'

const NotFound = () => {
    const { theme } = useAppSelector((state) => state.theme)

    return (
        <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.image}>
                <Image src={notFound} alt='404 not found' />
            </div>
            <h1>Page Not Found</h1>
            <p>
                We&lsquo;re sorry, the page you requested could not be found. <br /> Please go back to the homepage.
            </p>
            <Link href={routes.HOME}>
                <button>GO HOME</button>
            </Link>
        </div>
    )
}

export default NotFound
