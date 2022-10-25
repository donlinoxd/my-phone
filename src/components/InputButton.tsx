import { ChangeEventHandler } from 'react'

// local modules
import { useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/inputButton.module.scss'

interface ButtonProps {
    text: string
    name: string
    value: string
    onChange?: ChangeEventHandler<Element>
}

const InputButton = ({ text, name, value, onChange }: ButtonProps) => {
    const { theme } = useAppSelector((state) => state.theme)

    return (
        <div className={`${styles.button} ${theme === 'light' ? styles.light : styles.dark}`}>
            <input hidden type='radio' name={name} id={value} value={value} onChange={onChange} />
            <label htmlFor={value}>{text}</label>
        </div>
    )
}

export default InputButton
