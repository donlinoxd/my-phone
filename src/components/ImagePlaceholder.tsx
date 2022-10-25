import Image from 'next/image'

// local modules
import styles from '@/styles/components/imagePlaceholder.module.scss'

//  local static files
import heart from '@/images/web_heart.png'
interface ImagePlaceholderProps {
    width?: number | string
    height?: number | string
}

const ImagePlaceholder = ({ width = '60%', height = '100%' }: ImagePlaceholderProps) => {
    return (
        <div className={styles.skeleton} style={{ width, height }}>
            <div className={styles.icon}>
                <Image src={heart} alt='Heart' layout='fill' objectFit='contain' />
            </div>
        </div>
    )
}

export default ImagePlaceholder
