import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

// local modules
import routes from '@/constants/routes'
import useMediaQuery from '@/hooks/useMediaQueries'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/home.module.scss'

// local static files
import headphone from '@/images/mobile_headphone.png'
import backgroundmobile from '@/images/mobile_home_background.png'
import watch from '@/images/mobile_watch.png'
import bglaptop from '@/images/web_bg_main.png'
import buysmart from '@/images/web_buysmart.png'
import buysmartdark from '@/images/web_dark_buysmart.png'
import repairsmartdark from '@/images/web_dark_repairsmart.png'
import sellsmartdark from '@/images/web_dark_sellsmart.png'
import testmydevicedark from '@/images/web_dark_testmydevice.png'
import headertext from '@/images/web_header.png'
import background from '@/images/web_home_background.png'
import repairsmart from '@/images/web_light_repairsmart.png'
import sellsmart from '@/images/web_light_sellsmart.png'
import testmydevice from '@/images/web_light_testmydevice.png'
import bgpsp from '@/images/web_psp.png'
import search from '@/images/web_searchicon.png'
import { setTab } from '@/rtk/features/homeSlice'

const Home: NextPage = () => {
    const router = useRouter()
    const { tab } = useAppSelector((state) => state.home)
    const dispatch = useAppDispatch()
    const mobile = useMediaQuery('(max-width: 600px)')
    const laptopL = useMediaQuery('(min-width: 1500px)')
    const { theme } = useAppSelector((state) => state.theme)

    const submitHandler: React.FormEventHandler = (e) => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)

        const { search } = Object.fromEntries(data)

        if (!search) return

        router.push(`/search?params=${search}`)
    }

    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <Image src={headertext} alt='All your tech' />
                <p className={`${theme === 'light' ? styles.light : styles.dark}`}>
                    From buying, selling, testing and fixing.
                    <br /> We have all your devices covered.
                </p>
            </div>
            <div>
                <div className={`${styles.tabs_mobile} ${theme === 'light' ? styles.light : styles.dark}`}>
                    <button
                        onClick={() => {
                            dispatch(setTab('buy'))
                            router.push(routes.BUY)
                        }}
                        className={`${tab === 'buy' ? styles.tab_active : null}`}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => {
                            dispatch(setTab('sell'))
                            router.push(routes.SELL)
                        }}
                        className={`${tab === 'sell' ? styles.tab_active : null}`}
                    >
                        Sell
                    </button>
                    <button
                        onClick={() => {
                            dispatch(setTab('repair'))
                            router.push(routes.REPAIR)
                        }}
                        className={`${tab === 'repair' ? styles.tab_active : null}`}
                    >
                        Repair
                    </button>
                </div>
                <div className={`${styles.option} ${theme === 'light' ? styles.light : styles.dark}`}>
                    <div className={`${styles.tabs} ${theme === 'light' ? styles.light : styles.dark}`}>
                        <button
                            onClick={() => {
                                dispatch(setTab('buy'))
                                router.push(routes.BUY)
                            }}
                            className={`${tab === 'buy' ? styles.tab_active : null}`}
                        >
                            Buy
                        </button>
                        <button
                            onClick={() => {
                                dispatch(setTab('sell'))
                                router.push(routes.SELL)
                            }}
                            className={`${tab === 'sell' ? styles.tab_active : null}`}
                        >
                            Sell
                        </button>
                        <button
                            onClick={() => {
                                dispatch(setTab('repair'))
                                router.push(routes.REPAIR)
                            }}
                            className={`${tab === 'repair' ? styles.tab_active : null}`}
                        >
                            Repair
                        </button>
                    </div>
                    <form onSubmit={submitHandler}>
                        <input
                            className={theme === 'light' ? styles.light : styles.dark}
                            type='text'
                            name='search'
                            placeholder='type device name here'
                        />
                        <button type='submit'>
                            <Image src={search} alt='Search Button' />
                        </button>
                    </form>
                </div>
            </div>
            <div className={`${styles.card_wrapper} ${theme === 'light' ? styles.light : styles.dark}`}>
                <div>
                    <div>
                        <Image src={theme === 'light' ? buysmart : buysmartdark} alt='But Smart Icon' />
                        <h4>Buy Smart</h4>
                    </div>
                </div>
                <div>
                    <div>
                        <Image src={theme === 'light' ? sellsmart : sellsmartdark} alt='Sell Smart Icon' />
                        <h4>Sell Smart</h4>
                    </div>
                </div>
                <div>
                    <div>
                        <Image src={theme === 'light' ? repairsmart : repairsmartdark} alt='Repair Smart Icon' />
                        <h4>Repair Smart</h4>
                    </div>
                </div>
                <div>
                    <div>
                        <Image src={theme === 'light' ? testmydevice : testmydevicedark} alt='Test my device Icon' />
                        <h4>Test my device</h4>
                    </div>
                </div>

                <div className={styles.card_bg}>
                    <Image src={watch} alt='Watch' />
                    <Image src={headphone} alt='Headphone' />
                </div>
            </div>
            <div className={styles.background}>
                {laptopL ? (
                    <>
                        <div>
                            <Image src={bgpsp} alt='Main Background' priority />
                        </div>
                        <div>
                            <Image src={bglaptop} alt='Main Background' priority />
                        </div>
                    </>
                ) : (
                    <Image src={mobile ? backgroundmobile : background} alt='Main Background' priority />
                )}
            </div>
        </header>
    )
}

export default Home
