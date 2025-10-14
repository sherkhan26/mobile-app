import { useMemo } from 'react'
import { Animated } from 'react-native'

import { ITEM_SIZE } from '../carousel.constants'

export const useItemAnimation = (index: number, scrollX: Animated.Value) => {
	const inputRange = useMemo(
		() => [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE],
		[index]
	)

	/*rotate*/
	const rotate = scrollX.interpolate({
		inputRange,
		outputRange: ['4deg', '0deg', '-4deg']
	})

	/*opacity*/
	const opacity = scrollX.interpolate({
		inputRange,
		outputRange: [0.35, 1, 0.35]
	})

	/*scale*/
	const scale = scrollX.interpolate({
		inputRange,
		outputRange: [0.92, 1, 0.92]
	})

	/*opacity info block*/
	const opacityElements = scrollX.interpolate({
		inputRange,
		outputRange: [0, 1, 0]
	})

	return { rotate, opacity, scale, opacityElements }
}
