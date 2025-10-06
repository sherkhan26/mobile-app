import { FC } from 'react'

import { useActor } from '@/components/screens/actor/useActor'
import { Layout, Loader, MovieCatalog, NotFound } from '@/components/ui'

const Actor: FC = () => {
	const { isLoading, movies, actor } = useActor()

	if (isLoading) return <Loader />

	return (
		<Layout isHasPadding>
			{actor ? (
				<MovieCatalog movies={movies} title={actor.name} isBackButton />
			) : (
				<NotFound />
			)}
		</Layout>
	)
}

export default Actor
