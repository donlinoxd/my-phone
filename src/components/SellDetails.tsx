import Image from 'next/image'
import React from 'react'

// local modules
import InputButton from '@/components/InputButton'
import useToast from '@/hooks/useToast'
import { nextStep } from '@/rtk/features/sellSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/sellDetails.module.scss'

// local static files
import heart from '@/images/web_heart.png'

const conditions = [
    { value: 'bn', text: 'BRAND NEW' },
    { value: 'a', text: 'EXCELLENT' },
    { value: 'b', text: 'GOOD' },
    { value: 'c', text: 'FAIR' },
    { value: 'rf', text: 'DEAD' },
]

const carriers = [
    { value: 'unlocked', text: 'UNLOCKED' },
    { value: 'locked', text: 'LOCKED' },
]

const storages = [
    { value: '128gb', text: '128GB' },
    { value: '256gb', text: '256GB' },
    { value: '512gb', text: '512GB' },
    { value: '1tb', text: '1TB' },
]

const phoneStatus = [
    { value: 'noLocks', text: 'No Locks' },
    { value: 'financed', text: 'Financed' },
    { value: 'blacklistedOrBlocked', text: 'Blacklisted/Blocked' },
    { value: 'activationLock', text: 'Activation Lock' },
]

const SellDetails = () => {
    const { theme } = useAppSelector((state) => state.theme)
    const { payload } = useAppSelector((state) => state.sell)
    const dispatch = useAppDispatch()
    const toast = useToast()

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault()

        let values: any = {}
        const data = new FormData(e.target as HTMLFormElement)

        for (let [k, v] of data.entries()) {
            values[k] = v
        }

        if (
            !values.condition ||
            !values.carrier ||
            !values.storage ||
            !values.status ||
            !values.back_crack ||
            !values.front_crack ||
            !values.icloud_on
        ) {
            return toast.error('Please fill in all fields')
        }

        dispatch(nextStep({ device_details: values }))
    }

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>{`${payload.brand} ${payload.model?.model}`}</h1>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.background}>
                        <Image src={heart} alt='Heart background' />
                    </div>
                    <h1>
                        Your Device&rsquo;s Value
                        <br />
                        $1,020.00
                    </h1>

                    <div className={styles.image}>
                        <Image
                            src={payload.model?.imageUrl!}
                            layout='responsive'
                            objectFit='contain'
                            width='200%'
                            height='200%'
                            alt='Iphone 13 Pro Max'
                        />
                    </div>
                </div>
                <div className={styles.detail}>
                    <form className={`${styles.form} ${theme === 'light' ? styles.light : styles.dark}`} onSubmit={handleSubmit}>
                        <div>
                            <h3>CONDITION</h3>
                            <div className={styles.detail_wrapper}>
                                {conditions.map((condition) => (
                                    <InputButton text={condition.text} name='condition' value={condition.value} key={condition.value} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3>CARRIER</h3>
                            <div className={styles.detail_wrapper}>
                                {carriers.map((carrier) => (
                                    <InputButton text={carrier.text} name='carrier' value={carrier.value} key={carrier.value} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3>STORAGE</h3>
                            <div className={styles.detail_wrapper}>
                                {storages.map((storage) => (
                                    <InputButton text={storage.text} name='storage' value={storage.value} key={storage.value} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3>PHONE STATUS</h3>
                            <div className={`${styles.detail_wrapper} ${styles.status}`}>
                                {phoneStatus.map((status, index) => (
                                    <InputButton text={status.text} name='status' value={status.value} key={index} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3>ARE THERE ANY CRACKS/CHIPS ON THE BACK?</h3>
                            <div className={styles.detail_wrapper}>
                                <InputButton text='Yes' name='back_crack' value='back_yes' />
                                <InputButton text='No' name='back_crack' value='back_no' />
                            </div>
                        </div>
                        <div>
                            <h3>ANY CRACKS/CHIP ON FRONT SCREEN?</h3>
                            <div className={styles.detail_wrapper}>
                                <InputButton text='Yes' name='front_crack' value='front_yes' />
                                <InputButton text='No' name='front_crack' value='front_no' />
                            </div>
                        </div>
                        <div>
                            <h3>IS YOUR ICLOUD TURNED OFF?</h3>
                            <div className={styles.detail_wrapper}>
                                <InputButton text='Yes' name='icloud_on' value='icloud_yes' />
                                <InputButton text='No' name='icloud_on' value='icloud_no' />
                            </div>
                        </div>
                        <button type='submit' className={styles.button}>
                            CHECKOUT
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SellDetails
