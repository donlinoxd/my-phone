import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// local modules
import routes from '@/constants/routes'
import { GetServerSidePropsComponent, IPageProps } from '@/lib/auth'
import axios from '@/lib/axios'
import { toggleAuthForm } from '@/rtk/features/authSlice'
import { setFilter, setTab } from '@/rtk/features/orderSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/order.module.scss'

// local static files
import sprint from '@/images/web_sprint.png'

const MyOrder: NextPage<IPageProps> = (props) => {
    const { theme } = useAppSelector((state) => state.theme)
    const { tab, filter } = useAppSelector((state) => state.order)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [profile, setProfile] = useState<any>({})

    useEffect(() => {
        if (props.status === 200) {
            getProfile()
        } else if (props.status === 401) {
            router.push('/')
            dispatch(toggleAuthForm('login'))
        }
    }, [dispatch, props.status, router])

    const getProfile = async () => {
        try {
            const result = await axios.get('/users/profile')

            if (result.status === 200) {
                setProfile(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(profile)

    return (
        <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
            <h2>My Orders</h2>

            <div className={styles.tabs}>
                <h3 className={`${tab === 'sell' ? styles.active : null}`} onClick={() => dispatch(setTab('sell'))}>
                    Sell Smart
                </h3>
                <h3 className={`${tab === 'buy' ? styles.active : null}`} onClick={() => dispatch(setTab('buy'))}>
                    Buy Smart
                </h3>
                <h3 className={`${tab === 'repair' ? styles.active : null}`} onClick={() => dispatch(setTab('repair'))}>
                    Repair Smart
                </h3>
            </div>

            <div>
                <div className={styles.filter}>
                    <span className={`${filter === 'all' ? styles.active : null}`} onClick={() => dispatch(setFilter('all'))}>
                        All Orders
                    </span>
                    <span className={`${filter === 'pending' ? styles.active : null}`} onClick={() => dispatch(setFilter('pending'))}>
                        Pending Orders
                    </span>
                    <span className={`${filter === 'completed' ? styles.active : null}`} onClick={() => dispatch(setFilter('completed'))}>
                        Completed Orders
                    </span>
                </div>

                <div className={styles.order_wrapper}>
                    <div className={styles.row}>
                        <strong>Order Id</strong>
                        <span>3100215426</span>
                    </div>
                    <div className={styles.row}>
                        <strong>Order Date</strong>
                        <span>Mar 31, 2022 15:47</span>
                    </div>
                    <div className={styles.row}>
                        <strong>Delivery Way</strong>
                        <span className={styles.image}>
                            <Image src={sprint} alt='Boost' />
                        </span>
                    </div>
                    <div className={styles.row}>
                        <strong>Order Value</strong>
                        <span>$677.69</span>
                    </div>
                    <div className={styles.row}>
                        <strong>Order Status</strong>
                        <span>Order Placed</span>
                    </div>
                    <div className={styles.row}>
                        <strong>Operation</strong>
                        <Link href={`${routes.ORDER}/1`}>
                            <span>
                                <button>Details</button>
                            </span>
                        </Link>
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr className={styles.row}>
                            <th>Order Id</th>
                            <th>Order Date</th>
                            <th>Delivery Way</th>
                            <th>Order Value</th>
                            <th>Order Status</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.row}>
                            <td>3100215426</td>
                            <td>Mar 31, 2022 15:47</td>
                            <td>
                                <div className={styles.image}>
                                    <Image src={sprint} alt='Sprint' />
                                </div>
                            </td>
                            <td>$677.5</td>
                            <td>Order Placed</td>
                            <td>
                                <Link href={`${routes.ORDER}/1`}>
                                    <button>Details</button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default MyOrder

export const getServerSideProps: GetServerSideProps = async (context) => await GetServerSidePropsComponent(context)
