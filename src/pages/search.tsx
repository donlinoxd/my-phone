import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'
import { MdStar } from 'react-icons/md'

// local modules
import { generateCondition } from '@/components/BuyDetails'
import Pagination from '@/components/Pagination'
import useMediaQuery from '@/hooks/useMediaQueries'
import axios from '@/lib/axios'
import { TProduct } from '@/rtk/features/commonSlice'
import { setFilter, setPageNum, setProducts, setTotalPages } from '@/rtk/features/searchSlice'
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/pages/search.module.scss'

// local static files
import useDebounce from '@/hooks/useDebounce'
import searchWhite from '@/images/web_searchicon.png'

type Product = TProduct & {
    color: string
    condition: string
}

interface TPayload {
    query: string
    filters: string[]
    settings: {
        sortColumn: string
        sortOrder: string
        totalProductsPerPage: number
        page: number
    }
}

const Search = () => {
    const router = useRouter()
    const { theme } = useAppSelector((state) => state.theme)
    const { pageNum, totalPages, products, filter } = useAppSelector((state) => state.search)
    const inputRef = useRef<HTMLInputElement>(null)
    const mobile = useMediaQuery('(max-width: 600px)')
    const dispatch = useAppDispatch()
    const debounceValue = useDebounce(router.query.params)

    const buyHandler = (product: Product) => {
        console.log(product)
    }

    const searchHandler = useCallback(() => {
        const getSearchProducts = async (payload: TPayload) => {
            try {
                const result = await axios.post('/products/search', payload)

                dispatch(setProducts(result.data.products))
                dispatch(setTotalPages(parseInt(String(result.data.totalProducts / result.data.totalProductsPerPage))))
            } catch (error) {
                console.log(error)
            }
        }

        if (mobile) {
            const payload = {
                query: (router.query.params || ' ') as string,
                filters: filter ? [filter] : [],
                settings: {
                    sortColumn: 'brand',
                    sortOrder: 'desc',
                    totalProductsPerPage: 10,
                    page: pageNum,
                },
            }

            getSearchProducts(payload)
        } else {
            const payload = {
                query: (router.query.params || ' ') as string,
                filters: filter ? [filter] : [],
                settings: {
                    sortColumn: 'brand',
                    sortOrder: 'desc',
                    totalProductsPerPage: 6,
                    page: pageNum,
                },
            }

            getSearchProducts(payload)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobile, pageNum, debounceValue, filter, dispatch])
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    useEffect(() => {
        searchHandler()
    }, [mobile, pageNum, searchHandler, filter])

    return (
        <section className={`${styles.section} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.search}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        searchHandler()
                    }}
                >
                    <input
                        ref={inputRef}
                        defaultValue={router.query.params}
                        type='text'
                        placeholder='Search ...'
                        onChange={(e) => router.push(`/search?params=${e.target.value}`)}
                    />
                    <button type='submit'>
                        <div className={styles.image}>
                            <Image src={searchWhite} alt='Search Icon' />
                        </div>
                    </button>
                </form>
            </div>

            <div className={styles.product_list}>
                <div className={styles.list_header}>
                    <strong>Search result for &#8220;{router.query.params}&#8221;</strong>
                    <div className={styles.filter}>
                        <select name='filter' value={filter} onChange={(e) => dispatch(setFilter(e.target.value))}>
                            <option value=''>Filter</option>
                            <option value='brand'>Brand</option>
                            <option value='model'>Model</option>
                        </select>
                    </div>
                </div>
                <ul className={styles.product_container}>
                    {products.length ? (
                        products.map((product, index) => {
                            if (mobile) {
                                return (
                                    <div key={index} className={styles.card}>
                                        <div className={styles.product_image}>
                                            <Image
                                                src={product.imageUrl}
                                                width='80%'
                                                height='100%'
                                                objectFit='contain'
                                                alt={`${product.brand} ${product.model}`}
                                            />
                                        </div>
                                        <div className={styles.product_details}>
                                            <h3>{`${product.brand} ${product.model}`}</h3>
                                            <span>
                                                <MdStar />
                                                <MdStar />
                                                <MdStar />
                                                <MdStar />
                                                <MdStar />
                                            </span>
                                            <p>
                                                color: <span style={{ background: product.color.split('.')[0] }} />
                                            </p>
                                            <p>condition: {generateCondition(product.condition)}</p>
                                        </div>
                                        <div className={styles.product_actions}>
                                            <strong>${product.price || 1000 || 1000} </strong>
                                            <span>Free shipping</span>
                                            <button onClick={() => buyHandler(product)}>Buy now</button>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    index < 6 && (
                                        <div key={index} className={styles.card}>
                                            <div className={styles.product_image}>
                                                <Image
                                                    src={product.imageUrl}
                                                    width='80%'
                                                    height='100%'
                                                    objectFit='contain'
                                                    alt={`${product.brand} ${product.model}`}
                                                />
                                            </div>
                                            <div className={styles.product_details}>
                                                <h3>{`${product.brand} ${product.model}`}</h3>
                                                <span>
                                                    <MdStar />
                                                    <MdStar />
                                                    <MdStar />
                                                    <MdStar />
                                                    <MdStar />
                                                </span>
                                                <p>
                                                    color: <span style={{ background: product.color.split('.')[0] }} />
                                                </p>
                                                <p>condition: {generateCondition(product.condition)}</p>
                                            </div>
                                            <div className={styles.product_actions}>
                                                <strong>${product.price || 1000}</strong>
                                                <span>Free shipping</span>
                                                <button onClick={() => buyHandler(product)}>Buy now</button>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        })
                    ) : (
                        <div className={styles.empty_wrapper}>No products found.</div>
                    )}
                </ul>
            </div>

            <Pagination {...{ pageNum, setPageNum, totalPages }} />
        </section>
    )
}

export default Search
