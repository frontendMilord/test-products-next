import { useRef, useCallback } from 'react'

export const useDebouncedCallback = (callback: Function, ms: number) => {
	let timer = useRef<NodeJS.Timeout>()

	return useCallback(
		(...args: any) => {
			clearTimeout(timer.current)

			timer.current = setTimeout(() => {
				clearTimeout(timer.current)
				callback(...args)
			}, ms)
		},
		[callback, ms]
	)
}
