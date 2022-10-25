import Image from 'next/image'

// local modules
import useToast from '@/hooks/useToast'
import { nextStep } from '@/rtk/features/repairSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/repairSchedule.module.scss'

// local static files
import heartpsp from '@/images/web_heartandpsp.png'
import watch from '@/images/web_watch.png'

const RepairSchedule = () => {
    const { theme } = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const toast = useToast()

    const nextSevenDays = getNextSevenDays()
    const today = nextSevenDays[0]

    const submitHandler: React.FormEventHandler = (e) => {
        e.preventDefault()
        const values: any = {}

        const data = new FormData(e.target as HTMLFormElement)

        for (let [k, v] of data.entries()) {
            if (!v) continue
            values[k] = v
        }

        if (!values.schedule || !values.time) return toast.error('Select Schedule')

        dispatch(nextStep({ schedule: values }))
    }

    return (
        <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
            <h1>When do you want to come in?</h1>
            <form onSubmit={submitHandler}>
                <div className={styles.main}>
                    <h3>Choose a day.</h3>
                    <div className={styles.day_wrapper}>
                        {nextSevenDays.map((date) => (
                            <div key={date.date} className={styles.card}>
                                <input hidden type='radio' name='schedule' id={date.day} value={String(date.value)} />
                                <label htmlFor={date.day}>
                                    <strong>{date.day}</strong>
                                    <span>{`${date.month}/${date.date}`}</span>
                                </label>
                            </div>
                        ))}
                        <div className={styles.pick}>
                            <input type='date' name='schedule' id='date' />
                            <span>DAYS</span>
                        </div>
                    </div>
                    <div className={styles.time_wrapper}>
                        <strong>
                            choose a time on <span>{`${today.day} ${today.month}/${today.date}`}</span>
                        </strong>
                        <div className={`${styles.pick} ${styles.hidden}`}>
                            <input type='date' name='schedule' id='date' />
                            <span>DAYS</span>
                        </div>

                        <div className={styles.pick}>
                            <input type='time' name='time' id='time' />
                            <span>TIME</span>
                        </div>
                    </div>
                </div>
                <div className={styles.button}>
                    <button type='submit'>CONTINUE</button>
                </div>
            </form>

            <div className={styles.background}>
                <div className={styles.image1}>
                    <Image src={heartpsp} alt='Heart with PSP' />
                </div>
                <div className={styles.image2}>
                    <Image src={watch} alt='Watch' />
                </div>
            </div>
        </section>
    )
}

const getNextSevenDays = () => {
    const nextSevenDays: { day: string; month: number; date: number; value: string }[] = []

    //
    const dayAsString = (dayIndex: number) => {
        const weekdays = []
        weekdays[0] = 'Sun'
        weekdays[1] = 'Mon'
        weekdays[2] = 'Tue'
        weekdays[3] = 'Wed'
        weekdays[4] = 'Thu'
        weekdays[5] = 'Fri'
        weekdays[6] = 'Sat'

        return weekdays[dayIndex]
    }

    for (let i = 1; i <= 7; i++) {
        let currentDate = new Date()

        currentDate.setDate(new Date().getDate() + i)
        nextSevenDays.push({
            day: dayAsString(currentDate.getDay()),
            month: currentDate.getMonth() + 1,
            date: currentDate.getDate(),
            value: currentDate.toISOString().split('T')[0],
        })
    }

    return nextSevenDays
}

export default RepairSchedule
