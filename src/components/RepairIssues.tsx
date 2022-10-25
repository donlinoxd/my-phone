import { MdKeyboardArrowRight } from 'react-icons/md'

// local modules
import { nextStep } from '@/rtk/features/repairSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/repairIssues.module.scss'

const issues = [
    'Screen Damage',
    'Battery Drains Fast',
    'Charging Issue',
    'Rear Camera Issue',
    'Front Camera Issue',
    'Rear Camera Lens Damage',
    'Glass Damage',
    'Rear Camera Lens Damage',
    'Rear Camera Lens Damage',
    'Water/Liquid Damage',
    'Battery Drains Fast',
    'Charging Issue',
    'Rear Camera Issue',
    'Front Camera Issue',
    'Screen Damage',
    'Screen Damage',
    'Screen Damage',
    'Screen Damage',
]

const RepairIssues = () => {
    const { theme } = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    return (
        <section className={styles.section}>
            <h1>What&rsquo;s Wrong With Your Smartphone</h1>
            <div className={styles.issue_wrapper}>
                {issues.map((issue, index) => (
                    <div
                        key={index}
                        className={`${styles.issue} ${theme === 'light' ? styles.light : styles.dark}`}
                        onClick={() => dispatch(nextStep({ device_issue: issue }))}
                    >
                        <strong>{issue}</strong>
                        <MdKeyboardArrowRight fontSize='1.8em' />
                        <span className={styles.price}>Starting from $99</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RepairIssues
