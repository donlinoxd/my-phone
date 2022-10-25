import Image from 'next/image'
import { useEffect, useState } from 'react'

// local modules
import ImagePlaceholder from '@/components/ImagePlaceholder'
import Skeleton from '@/components/Skeleton'
import axios from '@/lib/axios'
import { BuyPayload } from '@/rtk/features/buySlice'
import { setBrands, TBrands } from '@/rtk/features/commonSlice'
import { SellPayload } from '@/rtk/features/sellSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/selectBrand.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface SelectBrandProps {
    title: string
    nextStep: ActionCreatorWithPayload<BuyPayload> | ActionCreatorWithPayload<SellPayload>
}

const SelectBrand = ({ title, nextStep }: SelectBrandProps) => {
    const { theme } = useAppSelector((state) => state.theme)
    const { brands } = useAppSelector((state) => state.common)
    const dispatch = useAppDispatch()
    const [imgLoadingComplete, setImgLoadingComplete] = useState<any>({})

    useEffect(() => {
        if (!brands.length) {
            const getBrands = async () => {
                try {
                    const result = await axios.get<TBrands[]>('/products/lists?filter=brand')

                    dispatch(setBrands(result.data))
                } catch (error) {
                    console.log(error)
                }
            }

            getBrands()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className={styles.wrapper}>
            <h1>Select your device to get started</h1>
            <h3>{title}</h3>
            <div className={styles.card_wrapper}>
                {brands?.length
                    ? [...brands]
                          .sort((a, b) => sortBrand.indexOf(a.brand) - sortBrand.indexOf(b.brand))
                          .map((brand, index) => (
                              <div className={styles.card} key={index}>
                                  <div
                                      className={`${theme === 'light' ? styles.light : styles.dark}`}
                                      onClick={() => dispatch(nextStep({ brand: brand.brand }))}
                                  >
                                      <div className={styles.image}>
                                          <Image
                                              src={brand.imageUrl}
                                              alt={brand.brand}
                                              onLoadingComplete={() => {
                                                  setImgLoadingComplete((prev: {}) => {
                                                      return { ...prev, [brand.brand]: true }
                                                  })
                                              }}
                                              layout='fill'
                                          />
                                          {!imgLoadingComplete[brand.brand] && <ImagePlaceholder />}
                                      </div>
                                      <strong>{brand.brand}</strong>
                                  </div>
                              </div>
                          ))
                    : [...Array(6).keys()].map((key) => (
                          <div key={key} className={styles.card}>
                              <div className={styles.skeleton}>
                                  <Skeleton width='70%' />
                                  <Skeleton width='70%' height='1rem' />
                              </div>
                          </div>
                      ))}
            </div>
        </section>
    )
}

const sortBrand = ['iPhone', 'Samsung Galaxy', 'Watch', 'Airpod', 'iPad', 'Macbook']

export default SelectBrand
