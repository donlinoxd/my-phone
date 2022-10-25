import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useRef } from 'react'
import { BsCart2, BsCurrencyDollar, BsHouseDoor, BsTools } from 'react-icons/bs'

// local modules
import routes from '@/constants/routes'
import useClickOutside from '@/hooks/useClickOutside'
import { toggleNav } from '@/rtk/features/navSlice'
import { changeTheme } from '@/rtk/features/themeSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/nav.module.scss'

// local static files
import burger from '@/images/mobile_burger.png'
import cart from '@/images/web_cart.png'
import myphonelogodark from '@/images/web_dark_myphone.png'
import sun from '@/images/web_dark_sun.png'
import moon from '@/images/web_light_moon.png'
import myphonelogo from '@/images/web_light_myphone.png'
import search from '@/images/web_search.png'
import userIcon from '@/images/web_user.png'

const Nav = () => {
    const { pathname, push } = useRouter()
    const { theme } = useAppSelector((state) => state.theme)
    const { navOpen } = useAppSelector((state) => state.nav)

    const dispatch = useAppDispatch()
    const ref = useRef<HTMLUListElement>(null)
    const closeHandler = useCallback(() => {
        dispatch(toggleNav())
    }, [dispatch])

    useClickOutside(ref, closeHandler)

    // const authFormHandler = () => {
    //     auth ? push(routes.PROFILE) : dispatch(toggleAuthForm('login'))
    // }

    return (
        <div className={`${theme === 'light' ? styles.light : styles.dark}`}>
            <nav className={`${styles.nav} container`}>
                <div className={`${styles.burger}`}>
                    <Image className='burger-menu' src={burger} alt='Burger Menu' onClick={closeHandler} />
                </div>
                <Link href={routes.HOME}>
                    <div className={styles.logo}>
                        <Image src={theme === 'light' ? myphonelogo : myphonelogodark} alt='Logo' />
                    </div>
                </Link>
                <ul className={styles.links}>
                    <li className={`${pathname === routes.HOME && styles.active}`}>
                        <Link href={routes.HOME}>HOME</Link>
                    </li>
                    <li className={`${pathname.includes(routes.BUY) && styles.active}`}>
                        <Link href={routes.BUY}>BUY</Link>
                    </li>
                    <li className={`${pathname.includes(routes.SELL) && styles.active}`}>
                        <Link href={routes.SELL}>SELL</Link>
                    </li>
                    <li className={`${pathname.includes(routes.REPAIR) && styles.active}`}>
                        <Link href={routes.REPAIR}>REPAIR</Link>
                    </li>
                </ul>
                <ul className={styles.menus}>
                    <li className={styles.hidden}>
                        <Image src={userIcon} alt='user' onClick={() => push(routes.PROFILE)} />
                    </li>
                    <Link href={routes.SEARCH}>
                        <li className={styles.hidden}>
                            <Image src={search} alt='search' />
                        </li>
                    </Link>
                    <Link href={routes.ORDER}>
                        <li>
                            <Image src={cart} alt='cart' />
                        </li>
                    </Link>
                    <li>
                        <div className={styles.toggle_theme}>
                            <div className={theme === 'light' ? styles.light : styles.dark}>
                                <span className={styles.circle} onClick={() => dispatch(changeTheme())} />
                                <Image src={theme === 'light' ? sun : moon} alt='theme mode' />
                            </div>
                        </div>
                    </li>
                </ul>
                {navOpen && (
                    <ul ref={ref} className={`${styles.links_open} ${theme === 'light' ? styles.light : styles.dark}`}>
                        <div className={styles.mobile_nav}>
                            <Link href={routes.PROFILE}>
                                <li onClick={closeHandler}>
                                    <Image src={userIcon} alt='user' />
                                </li>
                            </Link>
                            <Link href={routes.SEARCH}>
                                <li onClick={closeHandler}>
                                    <Image src={search} alt='search' />
                                </li>
                            </Link>
                            <Link href={routes.ORDER}>
                                <li onClick={closeHandler}>
                                    <Image src={cart} alt='cart' />
                                </li>
                            </Link>
                        </div>
                        <li>
                            <BsHouseDoor />
                            <Link href={routes.HOME}>
                                <a onClick={closeHandler}>HOME</a>
                            </Link>
                        </li>
                        <li>
                            <BsCart2 />
                            <Link href={routes.BUY}>
                                <a onClick={closeHandler}>BUY</a>
                            </Link>
                        </li>
                        <li>
                            <BsCurrencyDollar />
                            <Link href={routes.SELL}>
                                <a onClick={closeHandler}>SELL</a>
                            </Link>
                        </li>
                        <li>
                            <BsTools />
                            <Link href={routes.REPAIR}>
                                <a onClick={closeHandler}>REPAIR</a>
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    )
}

export default Nav
