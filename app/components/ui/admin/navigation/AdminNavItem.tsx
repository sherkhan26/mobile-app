import { MaterialIcons } from '@expo/vector-icons'
import cn from 'clsx'
import { FC } from 'react'
import { Pressable, Text } from 'react-native'

import { INavItem } from '@/components/ui/navigation/admin-navigation.interface'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'

const AdminNavItem: FC<{ item: INavItem }> = ({
	item: { routeName, title, icon }
}) => {
	const { navigate } = useTypedNavigation()
	const { name } = useTypedRoute()

	return (
		<Pressable
			// @ts-ignore
			onPress={() => navigate(routeName)}
			className='flex-row items-center mb-1'
		>
			<MaterialIcons
				name={icon}
				size={18}
				color={name === routeName ? '#D73033' : '#666'}
			/>
			<Text
				className={cn('text-xl text-[#D1D1D1] ml-2', {
					'text-[#D73033] font-medium': name === routeName
				})}
			>
				{title}
			</Text>
		</Pressable>
	)
}

export default AdminNavItem
