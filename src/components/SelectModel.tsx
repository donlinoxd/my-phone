import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

// local modules
import ImagePlaceholder from '@/components/ImagePlaceholder'
import Skeleton from '@/components/Skeleton'
import axios from '@/lib/axios'
import { BuyPayload } from '@/rtk/features/buySlice'
import { setProducts, TProduct } from '@/rtk/features/commonSlice'
import { RepairPayload } from '@/rtk/features/repairSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/selectModel.module.scss'

interface SelectModelProps {
    nextStep: ActionCreatorWithPayload<BuyPayload> | ActionCreatorWithPayload<RepairPayload>
    brand: string
}

const SelectModel = ({ nextStep, brand }: SelectModelProps) => {
    const { theme } = useAppSelector((state) => state.theme)
    const { products } = useAppSelector((state) => state.common)
    const dispatch = useAppDispatch()
    const [imgLoadingComplete, setImgLoadingComplete] = useState<any>({})

    useEffect(() => {
        if (!products.length) {
            const getProducts = async () => {
                try {
                    const result = await axios.get<TProduct[]>('/products/lists?filter=model')

                    if (result.status >= 200 && result.status <= 299) {
                        dispatch(setProducts(result.data))
                    } else throw new Error(result.statusText)
                } catch (error) {
                    console.log(error)
                }
            }

            getProducts()
        }
    }, [dispatch, products.length])

    return (
        <section className={styles.box}>
            <h1>Select Your Device</h1>
            <div className={styles.card_wrapper}>
                {products.length
                    ? [...products]
                          .filter((product) => product.brand === brand)
                          .sort((a, b) => parseInt(b.model) - parseInt(a.model))
                          .map((product, index) => (
                              <div
                                  key={index}
                                  className={`${styles.card} ${theme === 'light' ? styles.light : styles.dark}`}
                                  onClick={() => dispatch(nextStep({ model: product }))}
                              >
                                  <div className={styles.wrapper}>
                                      <div className={styles.image}>
                                          <Image
                                              src={product.imageUrl}
                                              alt={product.model}
                                              onLoadingComplete={() => {
                                                  setImgLoadingComplete((prev: {}) => {
                                                      return { ...prev, [product.model]: true }
                                                  })
                                              }}
                                              layout='fill'
                                          />
                                          {!imgLoadingComplete[product.model] && <ImagePlaceholder />}
                                      </div>
                                      <strong>{product.model}</strong>
                                  </div>
                              </div>
                          ))
                    : [...Array(12).keys()].map((key) => (
                          <div key={key} className={styles.card}>
                              <div className={styles.wrapper}>
                                  <Skeleton width='70%' />
                                  <Skeleton width='60%' height='1rem' />
                              </div>
                          </div>
                      ))}
            </div>
        </section>
    )
}

export default SelectModel
