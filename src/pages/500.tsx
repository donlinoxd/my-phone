import Image from 'next/image'
import Link from 'next/link'

// local modules
import routes from '@/constants/routes'
import { useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/404.module.scss'

// local static files
import server500 from '@/images/web_500.png'

const ServerError = () => {
    const { theme } = useAppSelector((state) => state.theme)

    return (
        <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.image}>
                <Image src={server500} alt='404 not found' />
            </div>
            <h1>Internal Server Error</h1>
            <p>
                The server encountered an internal error or misconfiguration <br /> and was unable to complete the request.
            </p>
            <Link href={routes.HOME}>
                <button>GO HOME</button>
            </Link>
        </div>
    )
}

export default ServerError
