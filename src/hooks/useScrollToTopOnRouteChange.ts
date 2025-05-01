// hooks/useScrollToTop.ts
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { animateScroll } from 'react-scroll'

export const useScrollToTopOnRouteChange = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 500, // Adjust duration as needed
            smooth: true, // Enable smooth scrolling
        })
    }, [pathname])
}
