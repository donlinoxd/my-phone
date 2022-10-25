import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'

import styles from '@/styles/components/buyDetails.module.scss'
import InputButton from '@/components/InputButton'
import IconButton from '@/components/IconButton'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import RelatedProducts from '@/components/RelatedProducts'
import useToast from '@/hooks/useToast'
import axios from '@/lib/axios'
import { nextStep, setProduct } from '@/rtk/features/buySlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'

import atnt from '@/images/web_at&t.png'
import boost from '@/images/web_boost.png'
import cricket from '@/images/web_cricket.png'
import heart from '@/images/web_heart.png'
import metro from '@/images/web_metro.png'
import sprint from '@/images/web_sprint.png'
import tmobile from '@/images/web_tmobile.png'
import unlocked from '@/images/web_unlocked.png'
import verizon from '@/images/web_verizon.png'

const BuyDetails = () => {
    const { theme } = useAppSelector((state) => state.theme)
    const { payload, product } = useAppSelector((state) => state.buy)
    const dispatch = useAppDispatch()
    const toast = useToast()
    const [variant, setVariant] = useState<any>([
        { brand: { $regex: payload.brand, $options: 'i' } },
        { model: { $regex: payload.model?.model, $options: 'i' } },
    ])

    const [imgLoading, setImgLoading] = useState(true)

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault()

        let values: any = {}
        const data = new FormData(e.target as HTMLFormElement)

        for (let [k, v] of data.entries()) {
            if (!v) return toast.error('Please fill in all fields')
            values[k] = v
        }

        dispatch(nextStep({ device_details: values }))
    }

    const handleChange: React.ChangeEventHandler = (e) => {
        const target = e.target as HTMLInputElement

        setVariant((vars: []) => [...vars.filter((v) => Object.keys(v)[0] !== target.name), { [target.name]: target.value }])
    }

    const handleFilter = useCallback(async () => {
        try {
            const result = await axios.post('/products/item', { variants: variant })

            dispatch(setProduct(result.data))
        } catch (error) {}
    }, [variant, dispatch])

    useEffect(() => {
        handleFilter()
    }, [variant, handleFilter])

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>
                {payload.brand} {payload.model?.model}
            </h1>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.background}>
                        <Image src={heart} alt='Heart background' />
                    </div>
                    <h1>
                        {payload.brand} {payload.model?.model}
                    </h1>
                    <div className={styles.image}>
                        {product && (
                            <>
                                <Image
                                    src={product.imageUrl}
                                    width='100%'
                                    height='100%'
                                    objectFit='contain'
                                    layout='responsive'
                                    alt='Iphone 13 Pro Max'
                                    onLoadingComplete={() => setImgLoading(false)}
                                />
                                {imgLoading && <ImagePlaceholder width='60%' height='80%' />}
                            </>
                        )}
                        {!product && <p className={styles.sub_title}>Not Available.</p>}
                    </div>
                </div>
                <div className={styles.detail}>
                    <form className={`${styles.form} ${theme === 'light' ? styles.light : styles.dark}`} onSubmit={handleSubmit}>
                        {payload.model?.carrier[0] ? (
                            <div>
                                <h3>carrier</h3>
                                <div className={styles.detail_wrapper}>
                                    {payload.model?.carrier.map((carrier) => (
                                        <IconButton
                                            image={generateCarrier(carrier)}
                                            name='carrier'
                                            value={carrier}
                                            key={carrier}
                                            onChange={handleChange}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        {payload.model?.condition[0] ? (
                            <div>
                                <h3>condition</h3>
                                <div className={styles.detail_wrapper}>
                                    {[...payload.model?.condition]
                                        ?.sort((a, b) => sortCondition.indexOf(a) - sortCondition.indexOf(b))
                                        .map((condition) => (
                                            <InputButton
                                                text={generateCondition(condition)}
                                                name='condition'
                                                value={condition}
                                                key={condition}
                                                onChange={handleChange}
                                            />
                                        ))}
                                </div>
                            </div>
                        ) : null}
                        {payload.model?.storage[0] ? (
                            <div>
                                <h3>storage</h3>
                                <div className={styles.detail_wrapper}>
                                    {[...payload.model?.storage]
                                        .sort((a, b) => sortStorage.indexOf(a) - sortStorage.indexOf(b))
                                        .map((storage) => (
                                            <InputButton text={storage} name='storage' value={storage} key={storage} onChange={handleChange} />
                                        ))}
                                </div>
                            </div>
                        ) : null}
                        {payload.model?.color[0] ? (
                            <div>
                                <h3>color</h3>
                                <div className={styles.colors}>
                                    {payload.model?.color?.map((color) => (
                                        <React.Fragment key={color}>
                                            <input hidden type='radio' name='color' id={color} value={color} onChange={handleChange} />
                                            <label htmlFor={color} style={{ background: color.split('.')[0] }} />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        <button type='submit' className={styles.button}>
                            CHECKOUT
                        </button>
                    </form>
                </div>
            </div>
            <RelatedProducts />
        </section>
    )
}

const sortCondition = ['bn', 'rf', 'a', 'b', 'c']
const sortStorage = ['2gb', '4gb', '8gb', '16gb', '32gb', '64gb', '128gb', '256gb', '512gb', '1tb', '2tb', '4tb', '8tb']

export const generateCarrier = (value: string) => {
    switch (value) {
        case 'unlocked':
            return unlocked
        case 'metroTMobile':
            return metro
        case 'at&t':
            return atnt
        case 'boost':
            return boost
        case 'spring':
            return sprint
        case 'cricket':
            return cricket
        case 'verizon':
            return verizon
        case 'tMobile':
            return tmobile
        default:
            return unlocked
    }
}

export const generateCondition = (value: string) => {
    switch (value) {
        case 'a':
            return 'Excellent (A)'
        case 'b':
            return 'Very Good (B)'
        case 'c':
            return 'Fair (C)'
        case 'bn':
            return 'Brand New'
        case 'rf':
            return 'Refurbished'
        default:
            return ''
    }
}

export default BuyDetails
