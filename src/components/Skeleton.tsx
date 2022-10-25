import Image from 'next/image'

// local modules
import styles from '@/styles/components/skeleton.module.scss'

// local static files
import heart from '@/images/web_heart.png'

interface SkeletonProps {
    width?: number | string
    height?: number | string
    icon?: true
}

const Skeleton = ({ width = '100%', height = '100%', icon }: SkeletonProps) => {
    return (
        <div className={styles.wrapper} style={{ width, height }}>
            {icon && (
                <div className={styles.icon}>
                    <Image src={heart} alt='Heart' layout='fill' objectFit='contain' />
                </div>
            )}
        </div>
    )
}

export default Skeleton
