import {useState, useEffect} from 'react'

export default function useScroll(initialPosition) {

    const [scrollPosition, setScrollPosition] = useState(initialPosition)

    const scrollHandler = () => {
         const position = window.pageYOffset;
         setScrollPosition(position)
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)

        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }
    },[])

    return [scrollPosition, scrollHandler]
}
