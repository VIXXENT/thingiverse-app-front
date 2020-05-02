import { useRef, MutableRefObject, useLayoutEffect } from 'react';
import { timeString } from './utils';

export interface GetScrollPositionArgument {
    element?: MutableRefObject<HTMLElement>;
    useWindow: boolean; 
}

export interface XYPosition{
    x: number;
    y: number;
    totalSize: {
        x: number;
        y: number;
    };
}

export interface PositionChange{
    previousPosition: XYPosition;
    currentPosition: XYPosition;
}

const isBrowser = typeof window !== `undefined`

function getScrollPosition({ element, useWindow }: GetScrollPositionArgument): XYPosition {
    if (!isBrowser) return { x: 0, y: 0, totalSize:{ x: 0, y: 0 } }
    const target = element ? element.current : document.body
    const position = target.getBoundingClientRect()

    return useWindow
        ? { x: window.scrollX, y: window.scrollY, totalSize:{x:window.innerWidth, y:window.innerHeight} }
        : { x: position.left, y: position.top, totalSize:{x:target.scrollWidth, y:target.scrollHeight} }
}

export default function(
    effect: (positionChange: PositionChange) => unknown,
    deps: [],
    element: MutableRefObject<HTMLElement>|undefined,
    useWindow: boolean,
    wait: number
): void {
    console.log(`${timeString()} USE_SCROLL_POSITION - START! - element: `, element);
    const position = useRef(getScrollPosition({ element, useWindow }))
    let throttleTimeout: NodeJS.Timeout|null = null

    const callBack: () => void = () => {
        const currentPosition = getScrollPosition({ element, useWindow })
        effect({ previousPosition: position.current, currentPosition })
        position.current = currentPosition
        throttleTimeout = null
    }

    useLayoutEffect(() => {
        const handleScroll: () => void = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    throttleTimeout = setTimeout(callBack, wait)
                }
            } else {
                callBack()
            }
        }

        window.addEventListener('scroll', handleScroll)
        const removeScrollListener: () => void = () => window.removeEventListener('scroll', handleScroll);
        return removeScrollListener;
    }, deps)
}