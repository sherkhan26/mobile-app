import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import Toast from 'react-native-toast-message'

import { useSearchForm } from '@/components/screens/search/useSearchForm'
import { ITableItem } from '@/components/ui'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import { UserService } from '@/services/user.service'

export const useUsers = () => {
	const { debouncedSearch, control } = useSearchForm()

	const { navigate } = useTypedNavigation()

	const queryData = useQuery(
		['search users', debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: data =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editNavigate: () =>
							navigate('UserEdit', {
								id: user._id
							}),
						items: [
							user.email,
							new Date(user.createdAt).toLocaleDateString('ru')
						]
					})
				)
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		['delete user'],
		(userId: string) => UserService.deleteUser(userId),
		{
			onSuccess: async () => {
				Toast.show({
					type: 'success',
					text1: 'Delete user',
					text2: 'delete was successful'
				})

				await queryData.refetch()
			}
		}
	)

	return useMemo(
		() => ({ ...queryData, control, deleteAsync }),
		[queryData, deleteAsync]
	)
}
