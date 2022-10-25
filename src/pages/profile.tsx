import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaPlus, FaRegCopy } from 'react-icons/fa'

// local modules
import routes from '@/constants/routes'
import useToast from '@/hooks/useToast'
import { GetServerSidePropsComponent, IPageProps } from '@/lib/auth'
import axios from '@/lib/axios'
import { toggleAuthForm } from '@/rtk/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/profile.module.scss'

// local static files
import coupon from '@/images/web_coupon.png'
import remove from '@/images/web_delete.png'
import editViolet from '@/images/web_editviolet.png'
import editWhite from '@/images/web_editwhite.png'
import profileImage from '@/images/web_profileimage.png'
import visa from '@/images/web_visa.png'

const Profile: NextPage<IPageProps> = (props) => {
    const router = useRouter()
    const { theme } = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const [profile, setProfile] = useState<any>({})
    const toast = useToast()

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

    const signoutHandler = async () => {
        try {
            const result = await axios.delete('/auth/signout')

            if (result.status >= 200 && result.status <= 299) {
                router.push(routes.HOME)
                toast.success('Sign out')
            } else {
                throw new Error(result.data)
            }
        } catch (error) {
            toast.error('Error sign out')
            console.log(error)
        }
    }

    const updateProfileHandler: React.FormEventHandler = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)

        const values = Object.fromEntries(data.entries()) as any

        try {
            const payload = {
                emailAddress: values.email || profile.emailAddress || ' ',
                firstName: values.name.split(' ')[0] || profile.firstName || ' ',
                lastName: values.name.split(' ')[1] || profile.lastName || ' ',
                birthDate: values.birthDate || profile.birthDate || ' ',
                phoneNumber: values.phoneNumber || profile.phoneNumber || ' ',
                gender: values.gender || profile.gender || ' ',
                address: values.address || profile.address || ' ',
                city: values.state || profile.city || ' ',
            }

            const result = await axios.post('/users/edit', payload)

            if (result.status >= 200 && result.status <= 299) {
                toast.success('Profile Updated')
                setProfile(payload)
            } else {
                toast.error('Error! Please try again later')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return profile ? (
        <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.profile}>
                <div className={styles.profile_header}>
                    <h3 className={styles.title}>My Profile</h3>
                    <span>View and edit your personal information below.</span>
                </div>
                <div className={styles.account_details}>
                    <div className={styles.detail_header}>
                        <div className={styles.image}>
                            <Image src={profileImage} alt='Profile image' />
                        </div>
                        <div className={styles.detail_text}>
                            <span className={styles.sub_title}>Account Email Address:</span>
                            <span>{profile.emailAddress}</span>
                            <span className={styles.button_wrapper}>
                                <span onClick={() => dispatch(toggleAuthForm('updatePassword'))}>Update Password</span>
                                <span>|</span>
                                <span onClick={signoutHandler}>Sign out</span>
                            </span>
                        </div>
                    </div>
                    <form className={styles.form} onSubmit={updateProfileHandler}>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' id='name' placeholder={`${profile.firstName} ${profile.lastName}`} />
                        </div>
                        <div>
                            <label htmlFor='birthDate'>Birthday</label>
                            <input type='text' name='birthDate' id='birthDate' placeholder={profile.birthDate} />
                        </div>
                        <div>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input type='text' name='phoneNumber' id='phoneNumber' placeholder={profile.phoneNumber} />
                        </div>
                        <div>
                            <label htmlFor='gender'>Gender</label>
                            <input type='text' name='gender' id='gender' placeholder={profile.gender} />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' id='email' placeholder={profile.emailAddress} />
                        </div>
                        <div>
                            <label htmlFor='state'>State/City</label>
                            <input type='text' name='state' id='state' placeholder={profile.city} />
                        </div>
                        <div>
                            <label htmlFor='address'>Street Address</label>
                            <input type='text' name='address' id='address' placeholder={profile.address} />
                        </div>

                        <button>
                            <div className={styles.image}>
                                <Image src={editWhite} alt='Edit icon' />
                            </div>
                            EDIT PROFILE
                        </button>
                    </form>
                </div>
            </div>
            <div className={styles.payment}>
                <h3>Payment Type</h3>
                <div className={styles.card}>
                    <div className={styles.card_image}>
                        <Image src={visa} alt='Visa' />
                    </div>
                    <div className={styles.card_details}>
                        <span>{profile.emailAddress}</span>
                        <div className={styles.icons}>
                            <Image src={theme === 'light' ? editViolet : editWhite} alt='Edit icon' />
                            <Image src={remove} alt='remove icon' />
                        </div>
                    </div>
                    <span>
                        <FaPlus fontSize='0.5em' /> Add A New Payment
                    </span>
                </div>
            </div>
            <div className={styles.address}>
                <div className={styles.title}>
                    <h3>My Address</h3>
                    <span>Add And Manage The Addresses You Use Regularly.</span>
                </div>
                <form>
                    <h4>Manage Your Address</h4>
                    <input type='text' name='address' />
                    <div className={styles.actions}>
                        <span>
                            <FaPlus fontSize='0.5em' /> Add A New Address
                        </span>
                        <div className={styles.icons}>
                            <Image src={theme === 'light' ? editViolet : editWhite} alt='Edit icon' />
                            <Image src={remove} alt='remove icon' />
                        </div>
                    </div>
                </form>
            </div>
            <div className={styles.commission}>
                <div className={styles.title}>
                    <h3>My Commission</h3>
                    <span>The commissions you earn from your referral are displayed here</span>
                </div>
                <div className={styles.card_wrapper}>
                    <h5>Referral Comission</h5>
                    <div className={styles.card}>
                        <span>
                            Total <br /> commission
                        </span>
                        <span>$0.00</span>
                    </div>
                    <div className={styles.card}>
                        <span>
                            Available <br /> commission
                        </span>
                        <span>$0.00</span>
                    </div>
                    <div className={styles.card}>
                        <span>
                            Pending <br /> commission
                        </span>
                        <span>$0.00</span>
                    </div>
                    <div className={styles.card}>
                        <span>
                            Used <br /> commission
                        </span>
                        <span>$0.00</span>
                    </div>

                    <h5>Comission Composition</h5>
                    <div className={styles.card}>
                        <span>
                            Individual invite <br /> Center
                        </span>
                        <span>$0.00</span>
                    </div>
                    <div className={styles.card}>
                        <span>
                            Brand <br /> Ambassador
                        </span>
                        <span>$0.00</span>
                    </div>
                </div>
                <div className={styles.invite_wrapper}>
                    <p>
                        Invite 2 friends to complete their orders on my phone, then you can become a brand ambassador! You can earn unlimited
                        commission!
                    </p>
                    <button>Invite Now</button>
                </div>
            </div>
            <div className={styles.coupon}>
                <div className={styles.title}>
                    <h3>My Coupon</h3>
                    <span>Check your coupons and use them as soon as possible.</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.tab_wrapper}>
                        <span className={styles.tab_active}>Coupon Available</span>
                        <span>Coupon Unavailable</span>
                    </div>
                    <div className={styles.tab_display}>
                        <div className={styles.image}>
                            <Image src={coupon} alt='Coupon' />
                        </div>
                        <span>Oops, You have no available coupon</span>
                        <span>All your available coupons will be displayed here.</span>
                    </div>
                </div>
            </div>
            <div className={styles.invite}>
                <div className={styles.title}>
                    <h3>Individual Invite Center</h3>
                </div>
                <div className={styles.content}>
                    <h5>You Referral Methods:</h5>
                    <div className={styles.code_wrapper}>
                        <span>Share your invitation code</span>
                        <strong>Mt256922</strong>
                        <button>
                            <FaRegCopy />
                            Copy
                        </button>
                    </div>
                    <div className={styles.code_wrapper}>
                        <span>Share your referral link</span>
                        <strong>https://buymyphones.com</strong>
                        <button>
                            <FaRegCopy />
                            Copy
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.ambassador}>
                <div className={styles.title}>
                    <h3>Brand Ambassador</h3>
                </div>
                <div className={styles.content}>
                    <span>Invite your friends to make their transaction on my phone with your referral link.</span>
                    <span>1. Invite friends to register and complete my phone transaction to get $10 cash rewards.</span>
                    <span>2. If you have invited 2 or more users, you can upgrade to brand ambassador and will be eligible to earn more money.</span>
                    <span>3. When you become a brand ambassador we&lsquo;ll give you an extra $10 reward.</span>
                </div>

                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.progress}>
                            <span>Your progress: 0%</span>
                            <span>Your progress: 50%</span>
                            <span>Your progress: 100%</span>
                        </div>
                        <div className={styles.slide}>
                            <span className={styles.circle} />
                            <span className={styles.circle} />
                            <span className={styles.circle} />
                        </div>
                        <div className={styles.progress}>
                            <span>Registered successfully</span>
                            <span>Invite 1 friend</span>
                            <span>Invite 2 friends</span>
                        </div>
                    </div>
                    <div className={styles.card_content}>
                        <div className={styles.input}>
                            <input type='checkbox' name='terms' id='terms' />
                            <label htmlFor='terms'>I agree to our Terms & Condition of Brand Ambassador.</label>
                        </div>
                        <button>Become A Brand Ambassador</button>

                        <p>
                            The $10 reward is only applicable when you become a brand ambassador for the first time. <br /> Subsequent exits and
                            re-entries will not have this bonus.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    ) : null
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (context) => await GetServerSidePropsComponent(context)
