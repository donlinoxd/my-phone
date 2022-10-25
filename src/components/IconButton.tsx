import Image, { StaticImageData } from 'next/image'
import { ChangeEventHandler } from 'react'

// local modules
import styles from '@/styles/components/iconButton.module.scss'
interface ButtonProps {
    image: StaticImageData
    name: string
    value: string
    onChange?: ChangeEventHandler<Element>
}

const IconButton = ({ image, name, value, onChange }: ButtonProps) => {
    return (
        <div className={styles.button}>
            <input hidden type='radio' name={name} id={value} value={value} onChange={onChange} />
            <label htmlFor={value}>
                <Image src={image} alt={value} className='image' />
            </label>
        </div>
    )
}

export default IconButton
