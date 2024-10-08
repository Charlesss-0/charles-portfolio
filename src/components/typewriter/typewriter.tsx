import React, { useEffect, useState } from 'react'

import { Cursor } from './typewriter.styles'

interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
	text: string
}

const Typewriter: React.FC<TypewriterProps> = ({ text, ...props }): React.ReactNode => {
	const [currentText, setCurrentText] = useState<string>('')
	const [direction, setDirection] = useState<number>(1) // 1 for forward, -1 for backward
	const [index, setIndex] = useState<number>(0)
	const delay = 10000

	useEffect(() => {
		const interval = setInterval(() => {
			if (direction === 1) {
				if (index === text.length) {
					setTimeout(() => {
						setDirection(-1) // Change direction to go backward after delay
					}, delay)
				} else {
					setCurrentText(text.slice(0, index + 1))
					setIndex(index + 1)
				}
			} else {
				if (index === 0) {
					setTimeout(() => {
						setDirection(1) // Change direction to go forward after delay
					}, delay)
				} else {
					setCurrentText(text.slice(0, index - 1))
					setIndex(index - 1)
				}
			}
		}, 50)

		return (): void => clearInterval(interval)
	}, [text, index, direction])

	return (
		<div className="flex items-center h-32 gap-2 w-max md:h-12">
			<span {...props}>{currentText}</span>
			<Cursor />
		</div>
	)
}

export default Typewriter
