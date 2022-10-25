import { useEffect, useRef } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

// local modules
import { useAppDispatch, useAppSelector } from '@/rtk/hook'
import styles from '@/styles/components/pagination.module.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface PaginationProps {
    pageNum: number
    setPageNum: ActionCreatorWithPayload<number>
    totalPages: number
}

const Pagination = ({ pageNum, setPageNum, totalPages }: PaginationProps) => {
    const { theme } = useAppSelector((state) => state.theme)
    const pageContainerRef = useRef<HTMLDivElement>(null)
    const pages = [...Array(totalPages).keys()].map((num) => num + 1)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const pageRef = pageContainerRef.current as HTMLDivElement

        if (!totalPages) return

        if (pageRef && pageNum >= 4 && pages[pages.length - 1] - pageNum > 1) {
            pageRef.style.left = `-${20 * (pageNum - 3)}%`
        } else if (pages[pages.length - 1] - pageNum <= 1) {
            return
        } else {
            pageRef.style.left = `0`
        }
    }, [pageNum, pages, totalPages])

    return totalPages ? (
        <div className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
            <div className={styles.wrapper}>
                <div
                    className={styles.button}
                    onClick={() => {
                        if (pageNum === pages[0]) return
                        dispatch(setPageNum(pageNum - 1))
                    }}
                >
                    <MdKeyboardArrowLeft />
                </div>
                <div className={styles.page_wrapper}>
                    <div className={styles.pages} ref={pageContainerRef}>
                        {pages.map((page) => (
                            <div key={page}>
                                <span onClick={() => dispatch(setPageNum(page))} className={pageNum === page ? styles.active : undefined}>
                                    {page}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={styles.button}
                    onClick={() => {
                        if (pageNum === pages[length - 1]) return
                        dispatch(setPageNum(pageNum + 1))
                    }}
                >
                    <MdKeyboardArrowRight />
                </div>
            </div>
        </div>
    ) : null
}

export default Pagination
